import { AnimationClassNames } from '@fluentui-vue/style-utilities'
import type { ICalloutPositionedInfo, IPosition, IRectangle } from '@fluentui-vue/utilities'
import { DirectionalHint, RectangleEdge, classNamesFunction, getBoundsFromTargetWindow, getMaxHeight, positionCallout } from '@fluentui-vue/utilities'
import { elementContains } from '@fluentui/dom-utilities'
import type { IProcessedStyleSet, IStyle } from '@fluentui/merge-styles'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { Popup } from '../Popup'
import type { ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types'
import { asSlotProps, makeStylingProps } from '@/utils'
import type { SlotProps } from '@/utils'

const ANIMATIONS: { [key: number]: string | undefined } = {
  [RectangleEdge.top]: AnimationClassNames.slideUpIn10,
  [RectangleEdge.bottom]: AnimationClassNames.slideDownIn10,
  [RectangleEdge.left]: AnimationClassNames.slideLeftIn10,
  [RectangleEdge.right]: AnimationClassNames.slideRightIn10,
}

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 }

const OFF_SCREEN_STYLE = {
  opacity: 0,
  filter: 'opacity(0)',
  pointerEvents: 'none',
}

const getClassNames = classNamesFunction<ICalloutContentStyleProps, ICalloutContentStyles>({
  disableCaching: true, // disabling caching because stylesProp.position mutates often
})

export const CalloutContentBase = defineComponent({
  name: 'CalloutContent',

  props: {
    ...makeStylingProps(),

    target: { type: [HTMLElement, String, Object, PointerEvent], required: true },
    calloutWidth: { type: Number, default: null },
    beakWidth: { type: Number, default: 16 },
    minPagePadding: { type: Number, default: 8 },
    isBeakVisible: { type: Boolean, default: true },
    coverTarget: { type: Boolean, default: false },
    gapSpace: { type: Number, default: 0 },
    finalHeight: { type: Number, default: undefined },
    calloutMaxWidth: { type: Number, default: undefined },
    calloutMinWidth: { type: Number, default: undefined },
    calloutMaxHeight: { type: Number, default: undefined },
    backgroundColor: { type: String, default: undefined },
    directionalHint: { type: Number as () => DirectionalHint, default: DirectionalHint.bottomAutoEdge },
    directionalHintFixed: { type: Boolean, default: false },
    overflowYHidden: { type: Boolean, default: false },
    doNotLayer: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },

    preventDismissOnScroll: { type: Boolean, default: false },
    preventDismissOnResize: { type: Boolean, default: false },
    preventDismissOnLostFocus: { type: Boolean, default: false },
    dismissOnTargetClick: { type: Boolean, default: false },

    repositionOnChildrenUpdated: { type: Boolean, default: false },

    role: { type: String, default: undefined },
    ariaRoledescription: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaLabelledBy: { type: String, default: undefined },
  },

  data() {
    return {
      positions: undefined as unknown as ICalloutPositionedInfo,
      maxHeight: 0,
      blockResetHeight: false,
      heightOffset: 0,
      positionAttempts: 0,
    }
  },

  computed: {
    targetRef(): any {
      if (typeof this.target === 'string')
        return document.querySelector(this.target) as HTMLElement
      if (this.target instanceof HTMLElement)
        return this.target
      if (this.target instanceof PointerEvent)
        return this.target
      return this.target.$el as HTMLElement
    },
    beakVisible(): boolean {
      return this.isBeakVisible && !!this.targetRef
    },
    overflowStyle(): IStyle {
      return {
        maxHeight: this.calloutMaxHeight ? `${this.calloutMaxHeight}px` : '100%',
        ...this.style,
        ...(this.overflowYHidden && { overflowY: 'hidden' }),
      }
    },
    visibilityStyle(): any {
      return this.hidden ? { visibility: 'hidden' } : undefined
    },
    actualBeakWidth(): number {
      return Math.sqrt(this.beakWidth * this.beakWidth * 2)
    },
    positionCss(): any {
      if (!this.positions)
        return null
      // TODO remove JSON parse/stringify deep clone hack
      const positionCss = JSON.parse(JSON.stringify(this.positions))
      for (const key in positionCss.elementPosition)
        positionCss.elementPosition[key] = `${positionCss.elementPosition[key]}px`

      for (const key in positionCss.beakPosition.elementPosition)
        positionCss.beakPosition.elementPosition[key] = `${positionCss.beakPosition.elementPosition[key]}px`

      return positionCss
    },
    bounds(): IRectangle {
      const currentBounds = getBoundsFromTargetWindow(this.targetRef, window)
      return {
        top: currentBounds.top + this.minPagePadding,
        left: currentBounds.left + this.minPagePadding,
        right: currentBounds.right! - this.minPagePadding,
        bottom: currentBounds.bottom! - this.minPagePadding,
        width: currentBounds.width - this.minPagePadding * 2,
        height: currentBounds.height - this.minPagePadding * 2,
      }
    },
    beakPosition(): any {
      const beakPositionStyle = {
        ...this.positionCss?.beakPosition?.elementPosition,
        display: this.positions?.beakPosition?.hideBeak ? 'none' : undefined,
      }

      if (!beakPositionStyle.top && !beakPositionStyle.bottom && !beakPositionStyle.left && !beakPositionStyle.right) {
        beakPositionStyle.left = BEAK_ORIGIN_POSITION.left
        beakPositionStyle.top = BEAK_ORIGIN_POSITION.top
      }

      return beakPositionStyle
    },
    positionsExists(): boolean {
      return !!this.positions
    },
    classNames(): IProcessedStyleSet<ICalloutContentStyles> {
      const { styles, theme, className, calloutWidth, calloutMaxWidth, calloutMinWidth, doNotLayer, backgroundColor, beakWidth, positions, overflowYHidden } = this.$props

      const classNames = getClassNames(styles!, {
        theme: theme!,
        className,
        overflowYHidden,
        calloutWidth,
        beakWidth,
        backgroundColor,
        calloutMaxWidth,
        calloutMinWidth,
        doNotLayer,
      })
      return classNames
    },
    slotProps(): SlotProps<ICalloutContentStyles> {
      const { classNames, positionCss, positions, hidden } = this
      const visibilityStyle = hidden ? { visibility: 'hidden' } : undefined
      return asSlotProps({
        container: {
          ref: 'rootRef',
          class: classNames.container,
          style: visibilityStyle,
        },
        root: {
          ref: 'calloutElement',
          class: [classNames.root, positions && positions.targetEdge && ANIMATIONS[positions.targetEdge!]],
          style: positions ? positionCss.elementPosition : OFF_SCREEN_STYLE,
          tabIndex: -1,
        },
        beak: {
          class: classNames.beak,
          style: this.beakPosition,
        },
        beakCurtain: {
          class: classNames.beakCurtain,
        },
        calloutMain: {
          ref: 'calloutMain',
          class: classNames.calloutMain,
          role: this.role,
          ariaRoledescription: this.ariaRoledescription,
          ariaDescribedBy: this.ariaDescribedBy,
          ariaLabel: this.ariaLabel,
          ariaLabelledBy: this.ariaLabelledBy,

          // propStyle: this.overflowStyle,
          // forwardRef: this.$refs.calloutMain,
          onDismiss: (ev: Event) => this.$emit('dismiss', ev),
        },
      })
    },
  },

  created() {
    window.addEventListener('click', this.dismissOnClickOrScroll, true)
    window.addEventListener('scroll', this.dismissOnScroll, true)
  },

  beforeUnmount() {
    window.removeEventListener('click', this.dismissOnClickOrScroll, true)
    window.removeEventListener('scroll', this.dismissOnScroll, true)
  },

  mounted() {
    this.updatePosition()
    if (this.repositionOnChildrenUpdated && this.$refs.calloutMain) {
      const calloutMain = this.$refs.calloutMain as HTMLDivElement
      let currentHeight = calloutMain.clientHeight
      const observer = new MutationObserver(() => {
        if (calloutMain.clientHeight === currentHeight)
          return

        currentHeight = calloutMain.clientHeight
        this.updatePosition()
      })
      observer.observe(calloutMain, { attributes: true, childList: true, subtree: true })
    }
  },

  methods: {
    updatePosition(): void {
      const positions = this.positions

      const currentProps: any = { ...this.$props }
      currentProps!.bounds = this.bounds
      currentProps!.target = this.targetRef!
      const newPositions = positionCallout(currentProps, this.$refs.rootRef, this.$refs.calloutElement, this.positions)

      if (
        (!positions && newPositions)
          || (positions && newPositions && !arePositionsEqual(positions, newPositions) && this.positionAttempts < 5)
      ) {
        this.positionAttempts++
        this.positions = newPositions
      }
      else if (this.positionAttempts > 0) {
        this.positionAttempts = 0
        this.$emit('positioned', this.positions)
      }
    },
    dismissOnScroll(ev: Event) {
      if (this.positionsExists && !this.preventDismissOnScroll)
        this.dismissOnClickOrScroll(ev)
    },
    dismissOnResize(ev: Event) {
      if (!this.preventDismissOnResize && !(this.preventDismissOnEvent && this.preventDismissOnEvent(ev)))
        this.$emit('dismiss', ev)
    },
    dismissOnLostFocus(ev: Event) {
      if (!this.preventDismissOnLostFocus)
        this.dismissOnClickOrScroll(ev)
    },
    dismissOnClickOrScroll(ev: Event): void {
      const eventPaths = ev.composedPath ? ev.composedPath() : []
      const target = eventPaths.length > 0 ? (eventPaths[0] as HTMLElement) : (ev.target as HTMLElement)
      const isEventTargetOutsideCallout = this.$refs.rootRef && !elementContains(this.$refs.rootRef, target)

      if (
        (!this.targetRef && isEventTargetOutsideCallout)
        || (
          isEventTargetOutsideCallout
            && (!this.targetRef
            || (target !== this.targetRef && !elementContains(this.targetRef, target))))
      )
        this.$emit('dismiss', ev)
    },
    // Max height should remain as synchronous as possible, which is why it is not done using set state.
    // It needs to be synchronous since it will impact the ultimate position of the callout.
    getMaxHeight(): number | undefined {
      if (!this.maxHeight) {
        if (this.directionalHintFixed && this.targetRef) {
          const beakWidth = this.isBeakVisible ? this.beakWidth : 0
          const gapSpace = this.gapSpace ? this.gapSpace : 0
          // Since the callout cannot measure it's border size it must be taken into account here. Otherwise it will
          // overlap with the target.
          const totalGap = gapSpace + beakWidth!
          window.requestAnimationFrame(() => {
            if (this.targetRef) {
              this.maxHeight = getMaxHeight(
                this.targetRef,
                this.directionalHint!,
                totalGap,
                this.bounds,
                this.coverTarget,
              )
              this.blockResetHeight = true
              this.$forceUpdate()
            }
          })
        }
        else {
          this.maxHeight = this.bounds.height!
        }
      }
      return this.maxHeight!
    },
  },

  render(): VNode {
    return h('div', this.slotProps.container, [
      h('div', this.slotProps.root, [
        this.beakVisible && h('div', this.slotProps.beak),
        this.beakVisible && h('div', this.slotProps.beakCurtain),

        h(Popup, this.slotProps.calloutMain, this.$slots.default),
      ]),
    ])
  },
})

/**
 * (Utility) used to compare two different elementPositions to determine whether they are equal.
 *
 * @param prevElementPositions
 * @param newElementPosition
 */
function arePositionsEqual(
  prevElementPositions: ICalloutPositionedInfo,
  newElementPosition: ICalloutPositionedInfo,
): boolean {
  return (
    comparePositions(prevElementPositions.elementPosition, newElementPosition.elementPosition)
    && comparePositions(prevElementPositions.beakPosition.elementPosition, newElementPosition.beakPosition.elementPosition)
  )
}

/**
 * (Utility) used in **arePositionsEqual** to compare two different elementPositions.
 *
 * @param prevElementPositions
 * @param newElementPositions
 */
function comparePositions(prevElementPositions: IPosition, newElementPositions: IPosition): boolean {
  for (const key in newElementPositions) {
    if (Object.prototype.hasOwnProperty.call(newElementPositions, key)) {
      const oldPositionEdge = prevElementPositions[key]
      const newPositionEdge = newElementPositions[key]
      if (oldPositionEdge !== undefined && newPositionEdge !== undefined) {
        if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2))
          return false
      }
      else {
        return false
      }
    }
  }
  return true
}
