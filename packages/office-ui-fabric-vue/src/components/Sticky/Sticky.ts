import { Vue, Component, Prop, Watch, Model, Inject } from 'vue-property-decorator'
import { hiddenContentStyle } from '@uifabric/styling'
import { IScrollablePaneContext } from '../ScrollablePane/ScrollablePane.types'
import { IStickyProps, StickyPositionType } from './Sticky.types'
import BaseComponent from '../BaseComponent'
import { CreateElement } from 'vue'

@Component({
})
export class Sticky extends BaseComponent<any, any> {
  $refs!: {
    root: HTMLDivElement
    stickyContentTop: HTMLDivElement
    stickyContentBottom: HTMLDivElement
    nonStickyContent: HTMLDivElement
    placeHolder: HTMLDivElement
    activeElement: HTMLElement
  }

  @Inject({ from: 'context', default: undefined }) context!: IScrollablePaneContext

  @Prop({ type: String, default: null }) stickyClassName!: string;
  @Prop({ type: String, default: null }) stickyBackgroundColor!: string;
  @Prop({ type: Number, default: StickyPositionType.Both }) stickyPosition!: StickyPositionType;
  @Prop({ type: Boolean, default: true }) isScrollSynced!: boolean;

  hiddenContentStyle = hiddenContentStyle

  isStickyTop = false
  isStickyBottom = false
  distanceFromTop = 0

  activeElement: HTMLElement | void | null = null

  render (h: CreateElement) {
    const { canStickyTop, canStickyBottom, isStickyTop, isStickyBottom, stickyClassName } = this

    const $stickyTop = canStickyTop && h('div', {
      ref: 'stickyContentTop',
      style: { pointerEvents: isStickyTop ? 'auto' : 'none' },
      attrs: {
        'aria-hidden': !isStickyTop,
      },
    }, [
      h('div', { style: this.getStickyPlaceholderHeight(isStickyTop) }),
    ])

    const $stickyBottom = canStickyBottom && h('div', {
      ref: 'stickyContentBottom',
      style: { pointerEvents: isStickyBottom ? 'auto' : 'none' },
      attrs: {
        'aria-hidden': !isStickyBottom,
      },
    }, [
      h('div', { style: this.getStickyPlaceholderHeight(isStickyBottom) }),
    ])

    const $placeHolder = h('div', {
      ref: 'placeHolder',
      style: this.getNonStickyPlaceholderHeightAndWidth(),
    }, [
      (isStickyTop || isStickyBottom) && h('span', {
        style: hiddenContentStyle,
      }, this.$slots.default),
      h('div', {
        ref: 'nonStickyContent',
        class: isStickyTop || isStickyBottom ? stickyClassName : undefined,
        style: this.getContentStyles(isStickyTop || isStickyBottom),
        attrs: {
          'aria-hidden': isStickyTop || isStickyBottom,
        },
      }, this.$slots.default),
    ])

    return h('div', { ref: 'root' }, [
      $stickyTop,
      $stickyBottom,
      $placeHolder,
    ])
  }

  public root () {
    return this.$refs.root
  }

  public get canStickyTop (): boolean {
    return this.stickyPosition === StickyPositionType.Both || this.stickyPosition === StickyPositionType.Header
  }

  public get canStickyBottom (): boolean {
    return this.stickyPosition === StickyPositionType.Both || this.stickyPosition === StickyPositionType.Footer
  }

  public syncScroll (container: HTMLElement): void {
    const { nonStickyContent } = this.$refs

    if (nonStickyContent && this.isScrollSynced) {
      nonStickyContent.scrollLeft = container.scrollLeft
    }
  };

  public mounted (): void {
    const { scrollablePane } = this.context

    if (!scrollablePane) {
      return
    }

    scrollablePane.subscribe(this._onScrollEvent)
    scrollablePane.addSticky(this)
  }

  public beforeDestroy (): void {
    const { scrollablePane } = this.context

    if (!scrollablePane) {
      return
    }

    scrollablePane.unsubscribe(this._onScrollEvent)
    scrollablePane.removeSticky(this)
  }

  @Watch('distanceFromTop')
  onDistanceFromTopChanged (newVal: number, oldVal: number) {
    const { scrollablePane } = this.context

    if (!scrollablePane) {
      return
    }

    if (newVal !== oldVal) {
      scrollablePane.sortSticky(this, true /* sortAgain */)
      // Sync Sticky scroll position with content container on each update
      scrollablePane.syncScrollSticky(this)
    }
  }

  @Watch('isStickyTop')
  onIsStickyTopChanged (newVal: boolean, oldVal: boolean) {
    const { scrollablePane } = this.context

    if (!scrollablePane) {
      return
    }

    if (newVal !== oldVal) {
      if (this.activeElement) {
        this.activeElement.focus()
      }
      scrollablePane.updateStickyRefHeights()
      // Sync Sticky scroll position with content container on each update
      scrollablePane.syncScrollSticky(this)
    }
  }

  @Watch('isStickyBottom')
  onIsStickyBottomChanged (newVal: boolean, oldVal: boolean) {
    const { scrollablePane } = this.context

    if (!scrollablePane) {
      return
    }

    if (newVal !== oldVal) {
      if (this.activeElement) {
        this.activeElement.focus()
      }
      scrollablePane.updateStickyRefHeights()
      // Sync Sticky scroll position with content container on each update
      scrollablePane.syncScrollSticky(this)
    }
  }

  public addSticky (stickyContent: HTMLDivElement): void {
    if (this.$refs.nonStickyContent) {
      stickyContent.appendChild(this.$refs.nonStickyContent)
    }
  }

  public resetSticky (): void {
    if (this.$refs.nonStickyContent && this.$refs.placeHolder) {
      this.$refs.placeHolder.appendChild(this.$refs.nonStickyContent)
    }
  }

  public setDistanceFromTop (container: HTMLDivElement): void {
    const distanceFromTop = this._getNonStickyDistanceFromTop(container)
    this.distanceFromTop = distanceFromTop
  }

  private getContentStyles (isSticky: boolean): any {
    return {
      backgroundColor: this.stickyBackgroundColor || this._getBackground(),
      overflow: isSticky ? 'hidden' : '',
    }
  }

  private getStickyPlaceholderHeight (isSticky: boolean): any {
    const height = this.$refs.nonStickyContent ? this.$refs.nonStickyContent.offsetHeight : 0
    return {
      visibility: isSticky ? 'hidden' : 'visible',
      height: isSticky ? 0 : height,
    }
  }

  private getNonStickyPlaceholderHeightAndWidth (): any {
    const { isStickyTop, isStickyBottom } = this
    if (isStickyTop || isStickyBottom) {
      let height = 0
      let width = 0
      // Why is placeHolder width needed?
      // ScrollablePane content--container is reponsible for providing scrollbars depending on content overflow.
      // If the overflow is caused by content of sticky component when it is in non-sticky state,
      // ScrollablePane content--conatiner will provide horizontal scrollbar.
      // If the component becomes sticky, i.e., when state.isStickyTop || state.isStickyBottom becomes true,
      // it's actual content is no more inside ScrollablePane content--container.
      // ScrollablePane content--conatiner will see no need for horizontal scrollbar. (Assuming no other content is causing overflow)
      // The complete content of sticky component will not be viewable.
      // It is necessary to provide a placeHolder of a certain width (height is already being set) in the content--container,
      // to get a horizontal scrollbar & be able to view the complete content of sticky component.
      if (this.$refs.nonStickyContent && this.$refs.nonStickyContent.firstElementChild) {
        height = this.$refs.nonStickyContent.offsetHeight
        // What value should be substituted for placeHolder width?
        // Assumption:
        //    1. Content inside <Sticky> should always be wrapped in a single div.
        //        <Sticky><div id={'firstElementChild'}>{intended_content}</div><Sticky/>
        //    2. -ve padding, margin, etc. are not be used.
        //    3. scrollWidth of a parent is greater than or equal to max of scrollWidths of it's children and same holds for children.
        // placeHolder width should be computed in the best possible way to prevent overscroll/underscroll.
        width =
          this.$refs.nonStickyContent.firstElementChild.scrollWidth +
          ((this.$refs.nonStickyContent.firstElementChild as HTMLElement).offsetWidth - this.$refs.nonStickyContent.firstElementChild.clientWidth)
      }
      return {
        height: height,
        width: width,
      }
    } else {
      return {}
    }
  }

  private _onScrollEvent (container: HTMLElement, footerStickyContainer: HTMLElement): void {
    if (this.$refs.root && this.$refs.nonStickyContent) {
      const distanceFromTop = this._getNonStickyDistanceFromTop(container)
      let isStickyTop = false
      let isStickyBottom = false

      if (this.canStickyTop) {
        const distanceToStickTop = distanceFromTop - this._getStickyDistanceFromTop()
        isStickyTop = distanceToStickTop < container.scrollTop
      }

      // Can sticky bottom if the scrollablePane - total sticky footer height is smaller than the sticky's distance from the top of the pane
      if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= distanceFromTop) {
        isStickyBottom =
          distanceFromTop - Math.floor(container.scrollTop) >= this._getStickyDistanceFromTopForFooter(container, footerStickyContainer)
      }

      if (
        document.activeElement &&
        this.$refs.nonStickyContent.contains(document.activeElement) &&
        (this.isStickyTop !== isStickyTop || this.isStickyBottom !== isStickyBottom)
      ) {
        this.activeElement = document.activeElement as HTMLElement
      } else {
        this.activeElement = undefined
      }

      this.isStickyTop = this.canStickyTop && isStickyTop
      this.isStickyBottom = isStickyBottom
      this.distanceFromTop = distanceFromTop
    }
  };

  private _getStickyDistanceFromTop (): number {
    let distance = 0
    if (this.$refs.stickyContentTop) {
      distance = this.$refs.stickyContentTop.offsetTop
    }

    return distance
  };

  private _getStickyDistanceFromTopForFooter (container: HTMLElement, footerStickyVisibleContainer: HTMLElement): number {
    let distance = 0
    if (this.$refs.stickyContentBottom) {
      distance = container.clientHeight - footerStickyVisibleContainer.offsetHeight + this.$refs.stickyContentBottom.offsetTop
    }

    return distance
  };

  private _getNonStickyDistanceFromTop (container: HTMLElement): number {
    let distance = 0
    let currElem = this.$refs.root

    if (currElem) {
      while (currElem && currElem.offsetParent !== container) {
        distance += currElem.offsetTop
        currElem = currElem.offsetParent as HTMLDivElement
      }

      if (currElem && currElem.offsetParent === container) {
        distance += currElem.offsetTop
      }
    }
    return distance
  };

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground (): string | undefined {
    if (!this.$refs.root) {
      return undefined
    }

    let curr: HTMLElement = this.$refs.root

    while (
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent'
    ) {
      if (curr.tagName === 'HTML') {
        // Fallback color if no element has a declared background-color attribute
        return undefined
      }
      if (curr.parentElement) {
        curr = curr.parentElement
      }
    }
    return window.getComputedStyle(curr).getPropertyValue('background-color')
  }
}

function _isOffsetHeightDifferent (a: HTMLElement | null, b: HTMLElement | null): boolean {
  return (a && b && a && b && a.offsetHeight !== b.offsetHeight) as boolean
}
