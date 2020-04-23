import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { IPanelProps, IPanelStyles, PanelType, IPanelStyleProps } from './Panel.types'
import BaseComponent from '../BaseComponent'
import { Layer } from '../Layer'
import { Overlay } from '../Overlay'
import { IconButton } from '../Button'
import { classNamesFunction, getId, elementContains, getRTL } from '@uifabric-vue/utilities'
import { IconFontSizes } from '@uifabric/styling'

const getClassNames = classNamesFunction<IPanelStyleProps, IPanelStyles>()

enum PanelVisibilityState {
  closed,
  animatingOpen,
  open,
  animatingClosed
}

@Component
export class PanelBase extends BaseComponent<IPanelProps> {
  $refs!: {
    scrollableContent: HTMLDivElement
    panel: HTMLDivElement
  }

  @Prop({ type: String, default: null }) headerText!: string
  @Prop() focusTrapZoneProps!: any
  @Prop() headerClassName!: any
  @Prop({ type: Number, default: PanelType.smallFixedFar }) type!: PanelType

  @Prop({ type: Function, default: null }) onDismiss!: (ev: any) => {}
  @Prop({ type: Function, default: null }) onDismissed!: () => {}
  @Prop({ type: Function, default: null }) onOpened!: () => {}
  @Prop({ type: Function, default: null }) onOuterClick!: () => {}

  @Prop({ type: Boolean, default: true }) hasCloseButton!: boolean
  @Prop({ type: Boolean, default: false }) isFooterAtBottom!: boolean
  @Prop({ type: Boolean, default: null }) isOpen!: boolean
  @Prop({ type: Boolean, default: false }) isHiddenOnDismiss!: boolean
  @Prop({ type: Boolean, default: true }) isBlocking!: boolean

  IconFontSizes = IconFontSizes

  isFooterSticky: boolean = false
  id: string = getId('Panel')
  visibility: PanelVisibilityState = PanelVisibilityState.closed

  private animationCallback: number | null = null;

  created () {
    window.addEventListener('resize', this.updateFooterPosition)

    if (this.shouldListenForOuterClick) {
      window.addEventListener('mousedown', this.dismissOnOuterClick, true)
    }
  }

  @Watch('isOpen')
  private onIsOpenUpdated (newVal: boolean, prevVal: boolean) {
    console.log('onIsOpenUpdated')
    if (newVal) {
      this.visibility = PanelVisibilityState.animatingOpen
    }
  }

  @Watch('visibility')
  private onVisibilityUpdated (newVal: number, prevVal: number) {
    console.log(newVal, prevVal)
    if (newVal !== prevVal) {
      this.clearExistingAnimationTimer()
      if (newVal === PanelVisibilityState.animatingOpen) {
        this.animateTo(PanelVisibilityState.open)
      } else if (newVal === PanelVisibilityState.animatingClosed) {
        this.animateTo(PanelVisibilityState.closed)
      }
    }
  }

  get shouldListenForOuterClick () {
    return !!this.isBlocking && !!this.isOpen
  }

  get classNames () {
    const {
      styles,
      theme,
      className = '',
      focusTrapZoneProps,
      hasCloseButton,
      headerClassName = '',
      isFooterSticky,
      isFooterAtBottom,
      isHiddenOnDismiss,
      type,
    } = this

    const { visibility } = this
    const isOpen = this.isActive
    const isAnimating = visibility === PanelVisibilityState.animatingClosed || visibility === PanelVisibilityState.animatingOpen

    const isLeft = !!(type === PanelType.smallFixedNear || type === PanelType.customNear)
    const isRTL = getRTL(theme)
    const isOnRightSide = isRTL ? isLeft : !isLeft

    return getClassNames(styles!, {
      theme: theme!,
      className,
      focusTrapZoneClassName: focusTrapZoneProps ? focusTrapZoneProps.className : undefined,
      hasCloseButton,
      headerClassName,
      isAnimating,
      isFooterSticky,
      isFooterAtBottom,
      isOnRightSide,
      isOpen,
      isHiddenOnDismiss,
      type,
      hasCustomNavigation: false,
    })
  }

  get isAnimating () {
    const { visibility } = this
    return visibility === PanelVisibilityState.animatingClosed || visibility === PanelVisibilityState.animatingOpen
  }

  get isActive (): boolean {
    return this.visibility === PanelVisibilityState.open || this.visibility === PanelVisibilityState.animatingOpen
  }

  public close () {
    console.log('close')
    console.log(this.isOpen, this.isActive, this.visibility)
    if (this.isOpen !== undefined) return
    if (!this.isActive) return

    console.log(this.visibility)
    this.visibility = PanelVisibilityState.animatingClosed
  }

  public dismiss (ev?: any): void {
    console.log('dismiss')
    if (this.onDismiss) {
      this.onDismiss(ev)
    }

    if (!ev || (ev && !ev.defaultPrevented)) {
      this.close()
    }
  }

  private dismissOnOuterClick (ev: any): void {
    const panel = this.$refs.panel
    if (this.isActive && panel && !ev.defaultPrevented()) {
      if (!elementContains(panel, ev.target)) {
        if (this.onOuterClick) {
          this.onOuterClick()
          ev.preventDefault()
        } else {
          this.dismiss()
        }
      }
    }
  }

  private updateFooterPosition (): void {
    const scrollableContent = this.$refs.scrollableContent
    if (scrollableContent) {
      const height = scrollableContent.clientHeight
      const innerHeight = scrollableContent.scrollHeight

      this.isFooterSticky = height < innerHeight
    }
  }

  private animateTo (newVisibilityState: PanelVisibilityState): void {
    console.log('animateTo', newVisibilityState)
    this.animationCallback = this._async.setTimeout(() => {
      this.visibility = newVisibilityState
      this._onTransitionComplete()
    }, 200)
  }

  private clearExistingAnimationTimer (): void {
    if (this.animationCallback !== null) {
      this._async.clearTimeout(this.animationCallback)
    }
  }

  private _onTransitionComplete (): void {
    this.updateFooterPosition()

    if (this.visibility === PanelVisibilityState.open && this.onOpened) {
      this.onOpened()
    }

    if (this.visibility === PanelVisibilityState.closed && this.onDismissed) {
      this.onDismissed()
    }
  }

  render () {
    const { classNames, isOpen, isAnimating, isHiddenOnDismiss, isBlocking, theme, headerText } = this
    if (!isOpen && !isAnimating && !isHiddenOnDismiss) return

    return (
      <Layer>
        <div ref="panel" class={classNames.root}>
          {(isBlocking && isOpen) && (<Overlay class={classNames.overlay} />)}
          <div class={classNames.main}>
            <div class={classNames.commands}>
              <div class={classNames.navigation}>
                <IconButton
                  class={classNames.closeButton}
                  styles={{
                    root: {
                      height: 'auto',
                      width: '44px',
                      color: theme.palette.neutralSecondary,
                      fontSize: IconFontSizes.large,
                    },
                    rootHovered: {
                      color: theme.palette.neutralPrimary,
                    },
                  }}
                  icon-props={{ iconName: 'Cancel' }}
                  nativeOnClick={this.dismiss} />
              </div>
            </div>

            <div class={classNames.contentInner}>
              <div class={classNames.header}>
                <p class={classNames.headerText}>
                  {this.$slots.header || headerText}
                </p>
              </div>

              <div ref="scrollableContent" class={classNames.scrollableContent}>
                <div class={classNames.content}>
                  {this.$slots.default}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layer>
    )
  }
}
