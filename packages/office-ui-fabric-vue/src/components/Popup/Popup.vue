<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getDocument, getWindow, on, Async, doesElementContainFocus } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'
import { CreateElement, VNode } from 'vue'

@Component({
  components: {},
})
export default class Popup extends BaseComponent {
  $refs!: {
    current: HTMLDivElement
  }
  @Prop({ type: Boolean, default: true }) shouldRestoreFocus!: boolean
  @Prop({ type: Object, default: () => {} }) style!: any

  private _originalFocusedElement!: HTMLElement;
  private _async!: Async;
  private needsVerticalScrollBar = false;
  private _containsFocus = false;
  // @ts-ignore
  private _disposables: (() => void)[] = [];

  created () {
    this._async = new Async(this)
    this._originalFocusedElement = getDocument()!.activeElement as HTMLElement
  }

  mounted () {
    if (this.$refs.current) {
      // @ts-ignore
      this._disposables.push(on(this.$refs.current, 'focus', this._onFocus, true), on(this.$refs.current, 'blur', this._onBlur, true))
      const currentWindow = getWindow(this.$refs.current)
      if (currentWindow) {
        this._disposables.push(on(currentWindow, 'keydown', this._onKeyDown as any))
      }
      if (doesElementContainFocus(this.$refs.current)) {
        this._containsFocus = true
      }
    }

    this._updateScrollBarAsync()
  }

  public updated () {
    this._updateScrollBarAsync()
    this._async.dispose()
  }

  public beforeDestroy (): void {
    this._disposables.forEach((dispose: () => void) => dispose())
    if (
      this.shouldRestoreFocus &&
      this._originalFocusedElement &&
      this._containsFocus &&
      (this._originalFocusedElement as any) !== window
    ) {
      // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
      // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
      // to reset the focus back to the thing it thinks should have been focused.
      if (this._originalFocusedElement) {
        this._originalFocusedElement.focus()
      }
    }
  }

  public render (h: CreateElement, context: any): VNode {
    const { className } = this

    return (
      <div ref="current"
        className={className}
        onKeyDown={this._onKeyDown}
        style={{ overflowY: this.needsVerticalScrollBar ? 'scroll' : undefined, outline: 'none' }}>
        {this.$slots.default}
      </div>
    )
  }

  private _onKeyDown = (ev: Event): void => {
    // switch (ev.which) {
    //   case KeyCodes.escape:
    //     if (this.onDismiss) {
    //       this.onDismiss(ev)

    //       ev.preventDefault()
    //       ev.stopPropagation()
    //     }

    //     break
    // }
  };

  private _updateScrollBarAsync (): void {
    this._async.requestAnimationFrame(() => {
      this._getScrollBar()
    })
  }

  private _getScrollBar (): void {
    // If overflowY is overriden, don't waste time calculating whether the scrollbar is necessary.
    if (this.style && this.style.overflowY) {
      return
    }

    let needsVerticalScrollBar = false
    if (this.$refs.current && this.$refs.current.firstElementChild) {
      // ClientHeight returns the client height of an element rounded to an
      // integer. On some browsers at different zoom levels this rounding
      // can generate different results for the root container and child even
      // though they are the same height. This causes us to show a scroll bar
      // when not needed. Ideally we would use BoundingClientRect().height
      // instead however seems that the API is 90% slower than using ClientHeight.
      // Therefore instead we will calculate the difference between heights and
      // allow for a 1px difference to still be considered ok and not show the
      // scroll bar.
      const rootHeight = this.$refs.current.clientHeight
      const firstChildHeight = this.$refs.current.firstElementChild.clientHeight
      if (rootHeight > 0 && firstChildHeight > rootHeight) {
        needsVerticalScrollBar = firstChildHeight - rootHeight > 1
      }
    }
    if (this.needsVerticalScrollBar !== needsVerticalScrollBar) {
      this.needsVerticalScrollBar = needsVerticalScrollBar
    }
  }

  private _onFocus = (): void => {
    this._containsFocus = true
  };

  private _onBlur = (ev: FocusEvent): void => {
    if (this.$refs.current && this.$refs.current.contains(ev.relatedTarget as HTMLElement)) {
      this._containsFocus = false
    }
  };
}
</script>

<style lang="scss" scoped>
</style>
