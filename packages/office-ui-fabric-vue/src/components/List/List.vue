<template>
  <div ref="root"
       :role="pages.length > 0 ? role : undefined"
       :class="css('ms-List', className)">
    <div ref="surface"
         class="ms-List-surface"
         role="presentation">
      <div v-for="page in pages"
           :key="page.key"
           :ref="page.key"
           class="ms-List-page"
           :style="getPageStyle(page)">
        <div v-for="(item, index) in page.items"
             :key="index"
             class="ms-List-cell">
          <slot name="item"
                :item="item"
                :index="page.startIndex + index">
            {{ item && item.name || '' }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { IList, IListProps, IPage, IPageProps, ScrollToMode } from './List.types'
import BaseComponent from '../BaseComponent'
import { IRectangle, findScrollableParent, getWindow, findIndex, getParent } from '@uifabric-vue/utilities'

const RESIZE_DELAY = 16
const MIN_SCROLL_UPDATE_DELAY = 100
const MAX_SCROLL_UPDATE_DELAY = 500
const IDLE_DEBOUNCE_DELAY = 200
// The amount of time to wait before declaring that the list isn't scrolling
const DONE_SCROLLING_WAIT = 500
const DEFAULT_ITEMS_PER_PAGE = 10
const DEFAULT_PAGE_HEIGHT = 30
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2
const PAGE_KEY_PREFIX = 'page-'
const SPACER_KEY_PREFIX = 'spacer-'

export interface IListState<T = any> {
  pages?: IPage<T>[];

  /** The last versionstamp for  */
  measureVersion?: number;
  isScrolling?: boolean;
}

interface IPageCacheItem<T> {
  page: IPage<T>;
  pageElement?: JSX.Element;
}

interface IPageCache<T> {
  [key: string]: IPageCacheItem<T>;
}

const EMPTY_RECT = {
  top: -1,
  bottom: -1,
  left: -1,
  right: -1,
  width: 0,
  height: 0,
}

// Naming expensive measures so that they're named in profiles.
const measurePageRect = (element: HTMLElement) => element.getBoundingClientRect()
const _measureSurfaceRect = measurePageRect
const _measureScrollRect = measurePageRect

/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback if
 * provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if provided by
 * the caller, or by cached measurements if available, or by a running average, or a default fallback.
 *
 * The algorithm for rendering pages works like this:
 *
 * 1. Predict visible pages based on "current measure data" (page heights, surface position, visible window)
 * 2. If changes are necessary, apply changes (add/remove pages)
 * 3. For pages that are added, measure the page heights if we need to using getBoundingClientRect
 * 4. If measurements don't match predictions, update measure data and goto step 1 asynchronously
 *
 * Measuring too frequently can pull performance down significantly. To compensate, we cache measured values so that
 * we can avoid re-measuring during operations that should not alter heights, like scrolling.
 *
 * To optimize glass rendering performance, onShouldVirtualize can be set. When onShouldVirtualize return false,
 * List will run in fast mode (not virtualized) to render all items without any measurements to improve page load time. And we
 * start doing measurements and rendering in virtualized mode when items grows larger than this threshold.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
@Component({
  components: {},
})
export default class List extends BaseComponent {
  $refs!: {
    root: HTMLDivElement
    surface: HTMLDivElement
  }
  @Prop({ type: Array, required: true }) items!: any
  @Prop({ type: Function, default: null }) getItemCountForPage!: (...args: any[]) => number
  @Prop({ type: Function, default: null }) getPageHeight!: (...args: any[]) => number
  @Prop({ type: Number, default: DEFAULT_RENDERED_WINDOWS_AHEAD }) renderedWindowsAhead!: number
  @Prop({ type: Number, default: DEFAULT_RENDERED_WINDOWS_BEHIND }) renderedWindowsBehind!: number
  @Prop({ type: Number, default: 0 }) startIndex!: number
  @Prop({ type: Boolean, default: false }) ignoreScrollingState!: boolean

  pages = []
  isScrolling = false
  measureVersion = 0

  surfaceRect: IRectangle | undefined;
  requiredRect: IRectangle | null = null
  allowedRect!: IRectangle
  visibleRect: IRectangle | undefined
  materializedRect: IRectangle | null = null

  scrollHeight: number = 0
  scrollTop: number = 0

  requiredWindowsAhead: number = 0
  requiredWindowsBehind: number = 0

  role: string = 'list'
  scrollElement!: HTMLElement

  focusedIndex = -1

  totalEstimates = 0

  hasCompletedFirstRender = false

  pageCache: any = {}

  cachedPageHeights: {
    [key: string]: {
      height: number;
      measureVersion: number;
    };
  } = {}
  estimatedPageHeight: number = 0

  created () {
    // @ts-ignore
    this._onScrollingDone = this._async.debounce(this._onScrollingDone, DONE_SCROLLING_WAIT, {
      leading: false,
    })
    this._onAsyncScroll = this._async.debounce(this._onAsyncScroll, MIN_SCROLL_UPDATE_DELAY, {
      leading: false,
      maxWait: MAX_SCROLL_UPDATE_DELAY,
    })
    this._onAsyncIdle = this._async.debounce(this._onAsyncIdle, IDLE_DEBOUNCE_DELAY, {
      leading: false,
    })
  }

  @Watch('items')
  itemsChanged (newVal: any, oldVal: any) {
    if (newVal !== oldVal) this.updatePages()
  }

  @Watch('isScrolling')
  shouldUpdate (newVal: boolean, oldVal: boolean) {
    if (!newVal && oldVal) this.updatePages()
  }

  mounted () {
    this.updatePages()
    this.measureVersion++
    this.scrollElement = findScrollableParent(this.$refs.root) as HTMLElement

    if (this.$refs.root) {
      this.events.on(this.$refs.root, 'focus', this._onFocus, true)
    }
    if (this.scrollElement) {
      this.events.on(this.scrollElement, 'scroll', this._onScroll)
      this.events.on(this.scrollElement, 'scroll', this._onAsyncScroll)
    }
  }

  /**
   * Debounced method to asynchronously update the visible region on a scroll event.
   */
  private _onAsyncScroll (): void {
    this.updateRenderRects()

    // Only update pages when the visible rect falls outside of the materialized rect.
    if (!this.materializedRect || !_isContainedWithin(this.requiredRect as IRectangle, this.materializedRect)) {
      this.updatePages()
    } else {
      // console.log('requiredRect contained in materialized', this._requiredRect, this._materializedRect);
    }
  }

  /**
   * This is an async debounced method that will try and increment the windows we render. If we can increment
   * either, we increase the amount we render and re-evaluate.
   */
  private _onAsyncIdle (): void {
    const { renderedWindowsAhead, renderedWindowsBehind } = this
    const { requiredWindowsAhead, requiredWindowsBehind } = this
    const windowsAhead = Math.min(renderedWindowsAhead as number, requiredWindowsAhead + 1)
    const windowsBehind = Math.min(renderedWindowsBehind as number, requiredWindowsBehind + 1)

    if (windowsAhead !== requiredWindowsAhead || windowsBehind !== requiredWindowsBehind) {
      this.requiredWindowsAhead = windowsAhead
      this.requiredWindowsBehind = windowsBehind
      this.updateRenderRects()
      this.updatePages()
    }

    if (renderedWindowsAhead! > windowsAhead || renderedWindowsBehind! > windowsBehind) {
      // Async increment on next tick.
      this._onAsyncIdle()
    }
  }

  /** Track the last item index focused so that we ensure we keep it rendered. */
  private _onFocus (ev: any): void {
    let target = ev.target as HTMLElement

    while (target !== this.$refs.surface) {
      const indexString = target.getAttribute('data-list-index')

      if (indexString) {
        this.focusedIndex = Number(indexString)
        break
      }

      target = getParent(target) as HTMLElement
    }
  }

  /**
   * Called synchronously to reset the required render range to 0 on scrolling. After async scroll has executed,
   * we will call onAsyncIdle which will reset it back to it's correct value.
   */
  private _onScroll (): void {
    if (!this.isScrolling && !this.ignoreScrollingState) {
      this.isScrolling = true
    }
    this.resetRequiredWindows()
    // @ts-ignore
    this._onScrollingDone()
  }

  private resetRequiredWindows (): void {
    this.requiredWindowsAhead = 0
    this.requiredWindowsBehind = 0
  }

  /**
   * Function to call when the list is done scrolling.
   * This function is debounced.
   */
  private _onScrollingDone (): void {
    if (!this.ignoreScrollingState) {
      this.isScrolling = false
    }
  }

  /** Generate the style object for the page. */
  private getPageStyle (page: any): any {
    const { getPageStyle } = this.$props

    return {
      ...(getPageStyle ? getPageStyle(page) : {}),
      ...(!page.items
        ? {
          height: page.height + 'px',
        }
        : {}),
    }
  }

  private _buildPages (props: any): any {
    let { renderCount } = props
    const { items, startIndex, getPageHeight } = props

    renderCount = this._getRenderCount(props)

    const materializedRect = { ...EMPTY_RECT }
    const pages: any[] = []

    let itemsPerPage = 1
    let pageTop = 0
    let currentSpacer: any = null
    const focusedIndex = this.focusedIndex
    const endIndex = startIndex! + renderCount
    const shouldVirtualize = this.shouldVirtualize(props)

    // First render is very important to track; when we render cells, we have no idea of estimated page height.
    // So we should default to rendering only the first page so that we can get information.
    // However if the user provides a measure function, let's just assume they know the right heights.
    const isFirstRender = this.estimatedPageHeight === 0 && !getPageHeight

    const allowedRect = this.allowedRect

    for (let itemIndex = startIndex!; itemIndex < endIndex; itemIndex += itemsPerPage) {
      const pageSpecification = this._getPageSpecification(itemIndex, allowedRect)
      const pageHeight = pageSpecification.height
      const pageData = pageSpecification.data
      const key = pageSpecification.key

      itemsPerPage = pageSpecification.itemCount

      const pageBottom = pageTop + pageHeight - 1

      const isPageRendered =
        findIndex(this.pages as any[], (page: any) => !!page.items && page.startIndex === itemIndex) > -1
      const isPageInAllowedRange = !allowedRect || (pageBottom >= allowedRect.top && pageTop <= allowedRect.bottom!)
      const isPageInRequiredRange = !this.requiredRect || (pageBottom >= this.requiredRect.top && pageTop <= this.requiredRect.bottom!)
      const isPageVisible = (!isFirstRender && (isPageInRequiredRange || (isPageInAllowedRange && isPageRendered))) || !shouldVirtualize
      const isPageFocused = focusedIndex >= itemIndex && focusedIndex < itemIndex + itemsPerPage
      const isFirstPage = itemIndex === startIndex

      // console.log('building page', itemIndex, 'pageTop: ' + pageTop, 'inAllowed: ' +
      // isPageInAllowedRange, 'inRequired: ' + isPageInRequiredRange)

      // Only render whats visible, focused, or first page,
      // or when running in fast rendering mode (not in virtualized mode), we render all current items in pages

      if (isPageVisible || isPageFocused || isFirstPage) {
        if (currentSpacer) {
          pages.push(currentSpacer)
          currentSpacer = null
        }

        const itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex)
        const newPage = this._createPage(key, items!.slice(itemIndex, itemIndex + itemsInPage), itemIndex, undefined, undefined, pageData)

        newPage.top = pageTop
        newPage.height = pageHeight
        if (this.visibleRect && this.visibleRect.bottom) {
          newPage.isVisible = pageBottom >= this.visibleRect.top && pageTop <= this.visibleRect.bottom
        }

        pages.push(newPage)

        if (isPageInRequiredRange && this.allowedRect) {
          _mergeRect(materializedRect, {
            top: pageTop,
            bottom: pageBottom,
            height: pageHeight,
            left: allowedRect.left,
            right: allowedRect.right,
            width: allowedRect.width,
          })
        }
      } else {
        if (!currentSpacer) {
          currentSpacer = this._createPage(SPACER_KEY_PREFIX + itemIndex, undefined, itemIndex, 0, undefined, pageData, true /* isSpacer */)
        }
        currentSpacer.height = (currentSpacer.height || 0) + (pageBottom - pageTop) + 1
        currentSpacer.itemCount += itemsPerPage
      }
      pageTop += pageBottom - pageTop + 1

      // in virtualized mode, we render need to render first page then break and measure,
      // otherwise, we render all items without measurement to make rendering fast
      if (isFirstRender && shouldVirtualize) {
        break
      }
    }

    if (currentSpacer) {
      currentSpacer.key = SPACER_KEY_PREFIX + 'end'
      pages.push(currentSpacer)
    }

    this.materializedRect = materializedRect

    // console.log('materialized: ', materializedRect)
    return {
      pages: pages,
      measureVersion: this.measureVersion,
    }
  }

  private _getPageSpecification (
    itemIndex: number,
    visibleRect: IRectangle,
  ): {
    // These return values are now no longer optional.
      itemCount: number;
      height: number;
      data?: any;
      key?: string;
    } {
    const { getPageSpecification } = this.$props
    if (getPageSpecification) {
      const pageData = getPageSpecification(itemIndex, visibleRect)

      const { itemCount = this._getItemCountForPage(itemIndex, visibleRect) } = pageData

      const { height = this._getPageHeight(itemIndex, visibleRect, itemCount) } = pageData

      return {
        itemCount: itemCount,
        height: height,
        data: pageData.data,
        key: pageData.key,
      }
    } else {
      const itemCount = this._getItemCountForPage(itemIndex, visibleRect)

      return {
        itemCount: itemCount,
        height: this._getPageHeight(itemIndex, visibleRect, itemCount),
      }
    }
  }

  /**
   * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
   * cached height, or estimated page height, or default page height.
   */
  private _getPageHeight (itemIndex: number, visibleRect: IRectangle, itemsPerPage: number): number {
    if (this.getPageHeight) {
      return this.getPageHeight(itemIndex, visibleRect, itemsPerPage)
    } else {
      const cachedHeight = this.cachedPageHeights[itemIndex]

      return cachedHeight ? cachedHeight.height : this.estimatedPageHeight || DEFAULT_PAGE_HEIGHT
    }
  }

  private _getItemCountForPage (itemIndex: number, visibileRect: IRectangle): number {
    const itemsPerPage = this.getItemCountForPage ? this.getItemCountForPage(itemIndex, visibileRect) : DEFAULT_ITEMS_PER_PAGE

    return itemsPerPage || DEFAULT_ITEMS_PER_PAGE
  }

  /** Called when a page has been added to the DOM. */
  private _onPageAdded (page: any): void {
    const { onPageAdded } = this.$props

    // console.log('page added', page.startIndex, this.state.pages.map(page => page.key).join(', '));

    if (onPageAdded) {
      onPageAdded(page)
    }
  }

  /** Called when a page has been removed from the DOM. */
  private _onPageRemoved (page: any): void {
    const { onPageRemoved } = this.$props

    // console.log('  --- page removed', page.startIndex, this.state.pages.map(page => page.key).join(', '));

    if (onPageRemoved) {
      onPageRemoved(page)
    }
  }

  /**
   * Notify consumers that the rendered pages have changed
   * @param oldPages - The old pages
   * @param newPages - The new pages
   * @param props - The props to use
   */
  private notifyPageChanges (oldPages: any[], newPages: any[], props: any = this.$props): void {
    const { onPageAdded, onPageRemoved } = props

    if (onPageAdded || onPageRemoved) {
      const renderedIndexes: {
        [index: number]: any;
      } = {}

      for (const page of oldPages) {
        if (page.items) {
          renderedIndexes[page.startIndex] = page
        }
      }

      for (const page of newPages) {
        if (page.items) {
          if (!renderedIndexes[page.startIndex]) {
            this._onPageAdded(page)
          } else {
            delete renderedIndexes[page.startIndex]
          }
        }
      }

      for (const index in renderedIndexes) {
        if (renderedIndexes.hasOwnProperty(index)) {
          this._onPageRemoved(renderedIndexes[index])
        }
      }
    }
  }

  private updatePages (props: any = this.$props): void {
    // console.log('updating pages')

    if (!this.requiredRect) {
      this.updateRenderRects(props)
    }

    const newListState = this._buildPages(props)
    const oldListPages = this.pages!

    this.notifyPageChanges(oldListPages, newListState.pages!)

    this.measureVersion = newListState.measureVersion
    this.pages = newListState.pages

    // Multiple updates may have been queued, so the callback will reflect all of them.
    // Re-fetch the current props and states to avoid using a stale props or state captured in the closure.
    const finalProps = this.$props
    const finalState = this

    // If we weren't provided with the page height, measure the pages
    if (!finalProps.getPageHeight) {
      // If measured version is invalid since we've updated the DOM
      const heightsChanged = this.updatePageMeasurements(finalState.pages!)

      // On first render, we should re-measure so that we don't get a visual glitch.
      if (heightsChanged) {
        this.materializedRect = null
        if (!this.hasCompletedFirstRender) {
          this.hasCompletedFirstRender = true
          this.updatePages(finalProps)
        } else {
          this._onAsyncScroll()
        }
      } else {
        // Enqueue an idle bump.
        this._onAsyncIdle()
      }
    } else {
      // Enqueue an idle bump
      this._onAsyncIdle()
    }

    // Notify the caller that rendering the new pages has completed
    if (finalProps.onPagesUpdated) {
      finalProps.onPagesUpdated(finalState.pages as any[])
    }
  }

  private updatePageMeasurements (pages: any[]): boolean {
    let heightChanged = false

    // when not in virtualize mode, we render all the items without page measurement
    if (!this.shouldVirtualize()) {
      return heightChanged
    }

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]

      if (page.items) {
        heightChanged = this.measurePage(page) || heightChanged
      }
    }

    return heightChanged
  }

  /**
   * Given a page, measure its dimensions, update cache.
   * @returns True if the height has changed.
   */
  private measurePage (page: any): boolean {
    let hasChangedHeight = false
    // @ts-ignore
    const pageElement = this.$refs[page.key] ? this.$refs[page.key][0] as HTMLElement : null
    const cachedHeight = this.cachedPageHeights[page.startIndex]

    // console.log('   * measure attempt', page.startIndex, cachedHeight)

    if (pageElement && this.shouldVirtualize() && (!cachedHeight || cachedHeight.measureVersion !== this.measureVersion)) {
      const newClientRect = {
        width: pageElement.clientWidth,
        height: pageElement.clientHeight,
      }

      if (newClientRect.height || newClientRect.width) {
        hasChangedHeight = page.height !== newClientRect.height

        // console.warn(' *** expensive page measure', page.startIndex, page.height, newClientRect.height);

        page.height = newClientRect.height

        this.cachedPageHeights[page.startIndex] = {
          height: newClientRect.height,
          measureVersion: this.measureVersion,
        }

        this.estimatedPageHeight = Math.round(
          (this.estimatedPageHeight * this.totalEstimates + newClientRect.height) / (this.totalEstimates + 1),
        )

        this.totalEstimates++
      }
    }

    return hasChangedHeight
  }

  private _createPage (
    pageKey: string | undefined,
    items: any[] | undefined,
    startIndex: number = -1,
    count: number = items ? items.length : 0,
    style: any = {},
    data?: any,
    isSpacer?: boolean,
  ): any {
    pageKey = pageKey || PAGE_KEY_PREFIX + startIndex
    const cachedPage = this.pageCache[pageKey]
    if (cachedPage && cachedPage.page) {
      return cachedPage.page
    }

    return {
      key: pageKey,
      startIndex: startIndex,
      itemCount: count,
      items: items,
      style: style,
      top: 0,
      height: 0,
      data: data,
      isSpacer: isSpacer || false,
    }
  }

  private _getRenderCount (props?: any): number {
    const { items, startIndex, renderCount } = props || this.$props

    return renderCount === undefined ? (items ? items.length - startIndex! : 0) : renderCount
  }

  private shouldVirtualize (props: any = this.$props): boolean {
    const { onShouldVirtualize } = this.$props
    return !onShouldVirtualize || onShouldVirtualize(props)
  }

  /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
  private updateRenderRects (props?: any, forceUpdate?: boolean): void {
    props = props || this.$props
    const { renderedWindowsAhead, renderedWindowsBehind } = props
    const { pages } = this
    // when not in virtualize mode, we render all items without measurement to optimize page rendering perf
    if (!this.shouldVirtualize(props)) {
      return
    }

    let surfaceRect = this.surfaceRect || { ...EMPTY_RECT }
    const scrollHeight = this.scrollElement && this.scrollElement.scrollHeight
    const scrollTop = this.scrollElement ? this.scrollElement.scrollTop : 0

    // WARNING: EXPENSIVE CALL! We need to know the surface top relative to the window.
    // This needs to be called to recalculate when new pages should be loaded.
    // We check to see how far we've scrolled and if it's further than a third of a page we run it again.
    if (
      this.$refs.surface &&
      (forceUpdate ||
        !pages ||
        !this.surfaceRect ||
        !scrollHeight ||
        scrollHeight !== this.scrollHeight ||
        Math.abs(this.scrollTop - scrollTop) > this.estimatedPageHeight / 3)
    ) {
      surfaceRect = this.surfaceRect = _measureSurfaceRect(this.$refs.surface)
      this.scrollTop = scrollTop
    }

    // If the scroll height has changed, something in the container likely resized and
    // we should redo the page heights incase their content resized.
    if (forceUpdate || !scrollHeight || scrollHeight !== this.scrollHeight) {
      this.measureVersion++
    }

    this.scrollHeight = scrollHeight

    // If the surface is above the container top or below the container bottom, or if this is not the first
    // render return empty rect.
    // The first time the list gets rendered we need to calculate the rectangle. The width of the list is
    // used to calculate the width of the list items.
    const visibleTop = Math.max(0, -surfaceRect.top)
    const win = getWindow(this.$refs.root)
    const visibleRect = {
      top: visibleTop,
      left: surfaceRect.left,
      bottom: visibleTop + win!.innerHeight,
      right: surfaceRect.right,
      width: surfaceRect.width,
      height: win!.innerHeight,
    }

    // The required/allowed rects are adjusted versions of the visible rect.
    this.requiredRect = _expandRect(visibleRect, this.requiredWindowsBehind, this.requiredWindowsAhead)
    this.allowedRect = _expandRect(visibleRect, renderedWindowsBehind!, renderedWindowsAhead!)

    // store the visible rect for later use.
    this.visibleRect = visibleRect
  }
}

function _expandRect (rect: IRectangle, pagesBefore: number, pagesAfter: number): IRectangle {
  const top = rect.top - pagesBefore * rect.height
  const height = rect.height + (pagesBefore + pagesAfter) * rect.height

  return {
    top: top,
    bottom: top + height,
    height: height,
    left: rect.left,
    right: rect.right,
    width: rect.width,
  }
}

function _isContainedWithin (innerRect: IRectangle, outerRect: IRectangle): boolean {
  return (
    innerRect.top >= outerRect.top &&
    innerRect.left >= outerRect.left &&
    innerRect.bottom! <= outerRect.bottom! &&
    innerRect.right! <= outerRect.right!
  )
}

function _mergeRect (targetRect: IRectangle, newRect: IRectangle): IRectangle {
  targetRect.top = newRect.top < targetRect.top || targetRect.top === -1 ? newRect.top : targetRect.top
  targetRect.left = newRect.left < targetRect.left || targetRect.left === -1 ? newRect.left : targetRect.left
  targetRect.bottom = newRect.bottom! > targetRect.bottom! || targetRect.bottom === -1 ? newRect.bottom : targetRect.bottom
  targetRect.right = newRect.right! > targetRect.right! || targetRect.right === -1 ? newRect.right : targetRect.right
  targetRect.width = targetRect.right! - targetRect.left + 1
  targetRect.height = targetRect.bottom! - targetRect.top + 1

  return targetRect
}
</script>
