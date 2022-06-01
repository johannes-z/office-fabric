import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, css, KeyCodes } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { Label } from '../Label'
import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types'

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>()

export const ONKEYDOWN_TIMEOUT_DURATION = 1000

export const SliderBase = Vue.extend({
  name: 'SliderBase',

  props: {
    ...withThemeableProps(),

    label: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    snapToStep: { type: Boolean, default: false },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 1 },

    value: { type: Number, default: null },
    defaultValue: { type: Number, default: null },

    lowerValue: { type: Number, default: null },
    defaultLowerValue: { type: Number, default: null },

    showValue: { type: Boolean, default: true },
    originFromZero: { type: Boolean, default: false },
    ranged: { type: Boolean, default: false },

    valueFormat: { type: Function, default: undefined },
  },

  data () {
    return {
      internalValue: this.value || this.defaultValue || this.min,
      internalLowerValue: this.lowerValue || this.defaultLowerValue || this.min,
      renderedValue: this.value || this.defaultValue || this.min,
      onKeyDownTimer: -1,
      isAdjustingLowerValue: false,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ISliderStyles> {
      const { className, disabled, vertical, renderedValue, internalValue, showValue, theme, ranged } = this
      return getClassNames(this.styles, {
        className,
        disabled,
        vertical,
        showTransitions: renderedValue === internalValue,
        showValue,
        theme: theme!,
        ranged,
      })
    },
    thumbOffsetPercent (): number {
      const { min, max, renderedValue } = this
      return min === max ? 0 : ((renderedValue! - min!) / (max! - min!)) * 100
    },
    zeroOffsetPercent (): number {
      const { min, max } = this
      return min! >= 0 ? 0 : (-min! / (max! - min!)) * 100
    },
    lengthString (): string {
      return this.vertical ? 'height' : 'width'
    },
  },

  methods: {
    onMouseDown (event: any) {
      if (this.disabled) return
      if (event.type === 'mousedown') {
        window.addEventListener('mousemove', this.onMove, true)
        window.addEventListener('mouseup', this.onMouseUp, true)
      } else if (event.type === 'touchstart') {
        window.addEventListener('touchmove', this.onMove, true)
        window.addEventListener('touchend', this.onMouseUp, true)
      }
      this.onMove(event)
    },

    onMouseUp (event: any) {
      if (this.disabled) return
      this.renderedValue = this.internalValue
      window.removeEventListener('mousemove', this.onMove, true)
      window.removeEventListener('mouseup', this.onMouseUp, true)
      window.removeEventListener('touchmove', this.onMove, true)
      window.removeEventListener('touchend', this.onMouseUp, true)
    },

    onMove (event: any) {
      window.requestAnimationFrame(() => {
        const { max, min, step, vertical } = this
        const steps: number = (max! - min!) / step!
        const sliderPositionRect: ClientRect = (this.$refs.sliderLine as HTMLDivElement).getBoundingClientRect()
        const sliderLength: number = !vertical
          ? sliderPositionRect.width
          : sliderPositionRect.height
        const stepLength: number = sliderLength / steps
        let currentSteps: number | undefined
        let distance: number | undefined

        if (!vertical) {
          const left: number | undefined = this.getPosition(event, vertical)
          distance = left! - sliderPositionRect.left
          currentSteps = distance / stepLength
        } else {
          const bottom: number | undefined = this.getPosition(event, vertical)
          distance = sliderPositionRect.bottom - bottom!
          currentSteps = distance / stepLength
        }

        let internalValue: number
        let renderedValue: number

        // The value shouldn't be bigger than max or be smaller than min.
        if (currentSteps! > Math.floor(steps)) {
          renderedValue = internalValue = max as number
        } else if (currentSteps! < 0) {
          renderedValue = internalValue = min as number
        } else {
          renderedValue = min! + step! * currentSteps!
          internalValue = min! + step! * Math.round(currentSteps!)
        }

        this.updateValue(internalValue, renderedValue)
      })
    },

    getPosition (event: MouseEvent | TouchEvent, vertical: boolean | undefined): number | undefined {
      let currentPosition: number | undefined
      switch (event.type) {
        case 'mousedown':
        case 'mousemove':
          currentPosition = !vertical
            ? (event as MouseEvent).clientX
            : (event as MouseEvent).clientY
          break
        case 'touchstart':
        case 'touchmove':
          currentPosition = !vertical
            ? (event as TouchEvent).touches[0].clientX
            : (event as TouchEvent).touches[0].clientY
          break
      }
      return currentPosition
    },

    updateValue (value: number, renderedValue: number): void {
      const { step, snapToStep } = this
      let numDec = 0
      if (isFinite(step!)) {
        while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
          numDec++
        }
      }
      // Make sure value has correct number of decimal places based on number of decimals in step
      const roundedValue = parseFloat(value.toFixed(numDec))
      const valueChanged = roundedValue !== this.internalValue

      if (snapToStep) {
        renderedValue = roundedValue
      }

      this.internalValue = roundedValue
      this.renderedValue = renderedValue
      this.$emit('input', roundedValue)
    },

    onKeyDown (event: KeyboardEvent): void {
      let value: number | undefined = this.internalValue
      const { max, min, step } = this

      let diff: number | undefined = 0

      switch (event.which) {
        case KeyCodes.left:
        case KeyCodes.down:
          diff = -(step as number)

          this.clearOnKeyDownTimer()
          this.setOnKeyDownTimer(event)

          break
        case KeyCodes.right:
        case KeyCodes.up:
          diff = step

          this.clearOnKeyDownTimer()
          this.setOnKeyDownTimer(event)

          break

        case KeyCodes.home:
          value = min
          break

        case KeyCodes.end:
          value = max
          break

        default:
          return
      }

      const newValue: number = Math.min(max as number, Math.max(min as number, value! + diff!))

      this.updateValue(newValue, newValue)

      event.preventDefault()
      event.stopPropagation()
    },

    clearOnKeyDownTimer (): void {
      clearTimeout(this.onKeyDownTimer)
    },

    setOnKeyDownTimer (event: KeyboardEvent): void {
      this.onKeyDownTimer = setTimeout(() => {
      }, ONKEYDOWN_TIMEOUT_DURATION)
    },

    onThumbFocus (event: FocusEvent): void {
      console.log(event)
      if (this.disabled) return
      this.isAdjustingLowerValue = event.target === this.$refs.lowerValueThumbRef
    },
  },

  render (h): VNode {
    const {
      classNames,
      disabled,
      originFromZero,
      vertical,
      zeroOffsetPercent,
      thumbOffsetPercent,
      lengthString,
      internalValue,
      label,
      ranged,
    } = this

    const $lowerValueLabel = ranged && this.showValue
      ? h(Label, {
        class: classNames.valueLabel,
        props: {
          disabled: disabled,
        },
      }, this.valueFormat ? this.valueFormat(this.internalLowerValue) : this.internalLowerValue)
      : undefined

    const $sliderLine = h('div', {
      ref: 'sliderLine',
      class: classNames.line,
    }, [
      ranged && h('span', {
        ref: 'lowerValueThumbRef',
        class: classNames.thumb,
        style: { [vertical ? 'bottom' : 'left']: `${zeroOffsetPercent}%` },
        on: {
          focus: this.onThumbFocus,
        },
      }),
      h('span', {
        ref: 'thumbRef',
        class: classNames.thumb,
        style: { [vertical ? 'bottom' : 'left']: `${thumbOffsetPercent}%` },
        on: {
          focus: this.onThumbFocus,
        },
      }),
      originFromZero && h('span', {
        class: classNames.zeroTick,
        style: { [vertical ? 'bottom' : 'left']: `${zeroOffsetPercent}%` },
      }),

      originFromZero && h('span', {
        class: css(classNames.lineContainer, classNames.inactiveSection),
        style: { [lengthString]: `${Math.min(thumbOffsetPercent, zeroOffsetPercent)}%` },
      }),
      originFromZero && h('span', {
        class: css(classNames.lineContainer, classNames.activeSection),
        style: { [lengthString]: `${Math.abs(zeroOffsetPercent - thumbOffsetPercent)}%` },
      }),
      originFromZero && h('span', {
        class: css(classNames.lineContainer, classNames.inactiveSection),
        style: { [lengthString]: `${Math.min(100 - thumbOffsetPercent, 100 - zeroOffsetPercent)}%` },
      }),
      !originFromZero && h('span', {
        class: css(classNames.lineContainer, classNames.activeSection),
        style: { [lengthString]: `${thumbOffsetPercent}%` },
      }),
      !originFromZero && h('span', {
        class: css(classNames.lineContainer, classNames.inactiveSection),
        style: { [lengthString]: `${100 - thumbOffsetPercent}%` },
      }),
    ])
    const $valueLabel = h(Label, {
      class: classNames.valueLabel,
    }, this.$scopedSlots.value?.({ value: internalValue }) ?? `${internalValue}`)

    return h('div', { class: classNames.root }, [
      h(Label, { class: classNames.titleLabel }, label),
      h('div', { class: classNames.container }, [
        $lowerValueLabel,
        h('div', {
          class: classNames.slideBox,
          attrs: {
            tabindenx: disabled ? undefined : 0,
          },
          on: {
            mousedown: this.onMouseDown,
            keydown: this.onKeyDown,
          },
        }, [
          $sliderLine,
        ]),
        $valueLabel,
      ]),
    ])
  },
})
