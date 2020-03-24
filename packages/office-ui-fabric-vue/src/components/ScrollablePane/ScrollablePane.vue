<template>
  <div ref="root" :class="classNames.root">
    <div ref="stickyAbove"
         aria-hidden="true"
         :class="classNames.stickyAbove"
         :style="getStickyContainerStyle(stickyTopHeight, true)" />

    <div ref="contentContainer"
         :class="classNames.contentContainer"
         :data-is-scrollable="true">
      <slot />
    </div>

    <div aria-hidden="true"
         :class="classNames.stickyBelow"
         :style="getStickyContainerStyle(stickyBottomHeight, false)">
      <div ref="stickyBelow" :class="classNames.stickyBelowItems" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction, getRTL } from '@uifabric-vue/utilities'
import { IScrollablePaneStyleProps, IScrollablePaneStyles, ScrollbarVisibility, IScrollablePaneContext } from './ScrollablePane.types'
import BaseComponent from '../BaseComponent'
import { Sticky } from '../Sticky/'

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>()

@Component({
  components: {},
  provide (this: ScrollablePane) {
    return {
      context: {
        scrollablePane: {
          subscribe: this.subscribe,
          unsubscribe: this.unsubscribe,
          addSticky: this.addSticky,
          removeSticky: this.removeSticky,
          updateStickyRefHeights: this.updateStickyRefHeights,
          sortSticky: this.sortSticky,
          notifySubscribers: this.notifySubscribers,
          syncScrollSticky: this.syncScrollSticky,
        },
      },

    }
  },
})
export default class ScrollablePane extends BaseComponent {
  $refs!: {
    root: HTMLDivElement
    stickyAbove: HTMLDivElement
    stickyBelow: HTMLDivElement
    contentContainer: HTMLDivElement
  }
  @Prop({ type: Number, default: 0 }) initialScrollPosition!: number;
  @Prop({ type: String, default: ScrollbarVisibility.auto }) scrollbarVisibility!: ScrollbarVisibility;

  stickyTopHeight: number = 0
  stickyBottomHeight: number = 0
  scrollbarWidth: number = 0
  scrollbarHeight: number = 0

  private subscribers: Set<Function> = new Set<Function>()
  private stickies: Set<Sticky> = new Set<Sticky>()
  private notifyThrottled!: () => void
  private mutationObserver: MutationObserver | null = null

  created () {
    this.notifyThrottled = this._async.throttle(this.notifySubscribers, 50)
  }

  mounted () {
    this.events.on(this.$refs.contentContainer, 'scroll', this._onScroll)
    this.events.on(window, 'resize', this._onWindowResize)

    const { initialScrollPosition } = this

    if (this.$refs.contentContainer && initialScrollPosition) {
      this.$refs.contentContainer.scrollTop = initialScrollPosition
    }

    // Set sticky distances from top property, then sort in correct order and notify subscribers
    this.setStickiesDistanceFromTop()
    this.stickies.forEach(sticky => {
      this.sortSticky(sticky)
    })
    this.notifySubscribers()

    if ('MutationObserver' in window) {
      this.mutationObserver = new MutationObserver(mutation => {
        // Function to check if mutation is occuring in stickyAbove or stickyBelow
        function checkIfMutationIsSticky (this: any, mutationRecord: MutationRecord): boolean {
          if (this.$refs.stickyAbove !== null && this.$refs.stickyBelow !== null) {
            return this.$refs.stickyAbove.contains(mutationRecord.target) || this.$refs.stickyBelow.contains(mutationRecord.target)
          }
          return false
        }

        // Compute the scrollbar height, which might have changed if the content's width changed and caused overflow
        const scrollbarHeight = this._getScrollbarHeight()
        // If the scrollbar height changed, update state so it's postioned correctly below sticky footer
        if (scrollbarHeight !== this.scrollbarHeight) {
          this.scrollbarHeight = scrollbarHeight
        }

        // Notify subscribers again to re-check whether Sticky should be Sticky'd or not
        this.notifySubscribers()

        // If mutation occurs in sticky header or footer, then update sticky top/bottom heights
        if (mutation.some(checkIfMutationIsSticky.bind(this))) {
          this.updateStickyRefHeights()
        } else {
          // If mutation occurs in scrollable region, then find Sticky it belongs to and force update
          const stickyList: Sticky[] = []
          this.stickies.forEach(sticky => {
            if (sticky.$refs.root && sticky.$refs.root.contains(mutation[0].target)) {
              stickyList.push(sticky)
            }
          })
          if (stickyList.length) {
            stickyList.forEach(sticky => {
              sticky.$forceUpdate()
            })
          }
        }
      })

      if (this.$refs.root) {
        this.mutationObserver.observe(this.$refs.root, {
          childList: true,
          attributes: true,
          subtree: true,
          characterData: true,
        })
      }
    }
  }

  get classNames () {
    const { className, theme, styles } = this
    return getClassNames(styles!, {
      theme: theme!,
      className,
      scrollbarVisibility: this.scrollbarVisibility,
    })
  }

  public setStickiesDistanceFromTop (): void {
    if (this.$refs.contentContainer) {
      this.stickies.forEach((sticky: any) => {
        sticky.setDistanceFromTop(this.$refs.contentContainer as HTMLDivElement)
      })
    }
  }

  public forceLayoutUpdate () {
    this._onWindowResize()
  }

  public subscribe (handler: Function): void {
    this.subscribers.add(handler)
  };

  public unsubscribe (handler: Function): void {
    this.subscribers.delete(handler)
  };

  public addSticky (sticky: any): void {
    this.stickies.add(sticky)

    // If ScrollablePane is mounted, then sort sticky in correct place
    if (this.$refs.contentContainer) {
      sticky.setDistanceFromTop(this.$refs.contentContainer)
      this.sortSticky(sticky)
    }
  };

  public removeSticky (sticky: any): void {
    this.stickies.delete(sticky)
    this._removeStickyFromContainers(sticky)
    this.notifySubscribers()
  };

  public sortSticky (sticky: any, sortAgain?: boolean): void {
    if (this.$refs.stickyAbove && this.$refs.stickyBelow) {
      if (sortAgain) {
        this._removeStickyFromContainers(sticky)
      }
      if (sticky.canStickyTop && sticky.$refs.stickyContentTop) {
        this._addToStickyContainer(sticky, this.$refs.stickyAbove, sticky.$refs.stickyContentTop)
      }

      if (sticky.canStickyBottom && sticky.$refs.stickyContentBottom) {
        this._addToStickyContainer(sticky, this.$refs.stickyBelow, sticky.$refs.stickyContentBottom)
      }
    }
  };

  public updateStickyRefHeights (): void {
    const stickyItems = this.stickies

    let stickyTopHeight = 0
    let stickyBottomHeight = 0

    stickyItems.forEach((sticky: any) => {
      const { isStickyTop, isStickyBottom } = sticky
      if (sticky.$refs.nonStickyContent) {
        if (isStickyTop) {
          stickyTopHeight += sticky.$refs.nonStickyContent.offsetHeight
        }
        if (isStickyBottom) {
          stickyBottomHeight += sticky.$refs.nonStickyContent.offsetHeight
        }
        this._checkStickyStatus(sticky)
      }
    })

    this.stickyTopHeight = stickyTopHeight
    this.stickyBottomHeight = stickyBottomHeight
  };

  public notifySubscribers (): void {
    if (this.$refs.contentContainer) {
      this.subscribers.forEach(handle => {
        // this.$refs.stickyBelow is passed in for calculating distance to determine Sticky status
        handle(this.$refs.contentContainer, this.$refs.stickyBelow)
      })
    }
  };

  public getScrollPosition (): number {
    if (this.$refs.contentContainer) {
      return this.$refs.contentContainer.scrollTop
    }

    return 0
  };

  public syncScrollSticky (sticky: any): void {
    if (sticky && this.$refs.contentContainer) {
      sticky.syncScroll(this.$refs.contentContainer)
    }
  };

  private _checkStickyStatus (sticky: any): void {
    if (this.$refs.stickyAbove && this.$refs.stickyBelow && this.$refs.contentContainer && sticky.$refs.nonStickyContent) {
      // If sticky is sticky, then append content to appropriate container
      if (sticky.isStickyTop || sticky.isStickyBottom) {
        if (sticky.isStickyTop && !this.$refs.stickyAbove.contains(sticky.$refs.nonStickyContent) && sticky.$refs.stickyContentTop) {
          sticky.addSticky(sticky.$refs.stickyContentTop)
        }

        if (sticky.isStickyBottom && !this.$refs.stickyBelow.contains(sticky.$refs.nonStickyContent) && sticky.$refs.stickyContentBottom) {
          sticky.addSticky(sticky.$refs.stickyContentBottom)
        }
      } else if (!this.$refs.contentContainer.contains(sticky.$refs.nonStickyContent)) {
        // Reset sticky if it's not sticky and not in the contentContainer element
        sticky.resetSticky()
      }
    }
  }

  private _addToStickyContainer (sticky: any, stickyContainer: HTMLDivElement, stickyContentToAdd: HTMLDivElement): void {
    // If there's no children, append child to list, otherwise, sort though array and append at correct position
    if (!stickyContainer.children.length) {
      stickyContainer.appendChild(stickyContentToAdd)
    } else {
      // If stickyContentToAdd isn't a child element of target container, then append
      if (!stickyContainer.contains(stickyContentToAdd)) {
        const stickyChildrenElements: Element[] = [].slice.call(stickyContainer.children)

        const stickyList: any[] = []
        // Get stickies.  Filter by canStickyTop/Bottom, then sort by distance from top, and then
        // filter by elements that are in the stickyContainer already.
        this.stickies.forEach((stickyItem: any) => {
          if (stickyContainer === this.$refs.stickyAbove && sticky.canStickyTop) {
            stickyList.push(stickyItem)
          } else if (sticky.canStickyBottom) {
            stickyList.push(stickyItem)
          }
        })

        const stickyListSorted = stickyList
          .sort((a, b) => {
            return (a.distanceFromTop || 0) - (b.distanceFromTop || 0)
          })
          .filter(item => {
            const stickyContent = stickyContainer === this.$refs.stickyAbove ? item.stickyContentTop : item.stickyContentBottom
            if (stickyContent) {
              return stickyChildrenElements.indexOf(stickyContent) > -1
            }
          })

        // Get first element that has a distance from top that is further than our sticky that is being added
        let targetStickyToAppendBefore: any | undefined
        for (const stickyListItem of stickyListSorted) {
          if ((stickyListItem.distanceFromTop || 0) >= (sticky.distanceFromTop || 0)) {
            targetStickyToAppendBefore = stickyListItem
            break
          }
        }

        // If target element to append before is known, then grab respective stickyContentTop/Bottom element and insert before
        let targetContainer: HTMLDivElement | null = null
        if (targetStickyToAppendBefore) {
          targetContainer =
            stickyContainer === this.$refs.stickyAbove
              ? targetStickyToAppendBefore.stickyContentTop
              : targetStickyToAppendBefore.stickyContentBottom
        }
        stickyContainer.insertBefore(stickyContentToAdd, targetContainer)
      }
    }
  };

  private _removeStickyFromContainers (sticky: any): void {
    if (this.$refs.stickyAbove && sticky.stickyContentTop && this.$refs.stickyAbove.contains(sticky.stickyContentTop)) {
      this.$refs.stickyAbove.removeChild(sticky.stickyContentTop)
    }
    if (this.$refs.stickyBelow && sticky.stickyContentBottom && this.$refs.stickyBelow.contains(sticky.stickyContentBottom)) {
      this.$refs.stickyBelow.removeChild(sticky.stickyContentBottom)
    }
  };

  private _onWindowResize (): void {
    const scrollbarWidth = this._getScrollbarWidth()
    const scrollbarHeight = this._getScrollbarHeight()

    this.scrollbarWidth = scrollbarWidth
    this.scrollbarHeight = scrollbarHeight

    this.notifySubscribers()
  };

  private getStickyContainerStyle (height: number, isTop: boolean): any {
    return {
      height: height,
      ...(getRTL(this.theme)
        ? {
          right: '0',
          left: `${this.scrollbarWidth || this._getScrollbarWidth() || 0}px`,
        }
        : {
          left: '0',
          right: `${this.scrollbarWidth || this._getScrollbarWidth() || 0}px`,
        }),
      ...(isTop
        ? {
          top: '0',
        }
        : {
          bottom: `${this.scrollbarHeight || this._getScrollbarHeight() || 0}px`,
        }),
    }
  };

  private _getScrollbarWidth (): number {
    const { contentContainer } = this.$refs
    return contentContainer ? contentContainer.offsetWidth - contentContainer.clientWidth : 0
  }

  private _getScrollbarHeight (): number {
    const { contentContainer } = this.$refs
    return contentContainer ? contentContainer.offsetHeight - contentContainer.clientHeight : 0
  }

  private _onScroll () {
    const { contentContainer } = this.$refs

    if (contentContainer) {
      this.stickies.forEach((sticky: Sticky) => {
        // @ts-ignore
        sticky.syncScroll(contentContainer)
      })
    }

    this.notifyThrottled()
  };
}
</script>
