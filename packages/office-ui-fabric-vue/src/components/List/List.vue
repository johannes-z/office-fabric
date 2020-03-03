<template>
  <div ref="root"
       :role="pageElements.length > 0 ? role : undefined"
       :className="css('ms-List', className)">
    <div ref="surface"
         className="ms-List-surface"
         role="presentation">
      <div v-for="(item, index) in items"
           :key="index"
           className="ms-List-cell">
        <slot name="cell" :item="item">
          {{ item && item.name || '' }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IList, IListProps, IPage, IPageProps, ScrollToMode } from './List.types'
import BaseComponent from '../BaseComponent'
import { IRectangle, findScrollableParent } from '@uifabric-vue/utilities'

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
const _measurePageRect = (element: HTMLElement) => element.getBoundingClientRect()
const _measureSurfaceRect = _measurePageRect
const _measureScrollRect = _measurePageRect

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

  role: string = 'list'
  scrollElement!: HTMLElement

  mounted () {
    this.scrollElement = findScrollableParent(this.$refs.root) as HTMLElement
  }

  get pageElements () {
    return this.items
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
