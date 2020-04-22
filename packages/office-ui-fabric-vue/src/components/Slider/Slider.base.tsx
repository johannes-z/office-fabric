import { Vue, Component, Prop } from 'vue-property-decorator'
import { Label } from '../Label/'
import { ISliderProps, ISliderStyles, ISliderStyleProps } from './Slider.types'
import BaseComponent from '../BaseComponent'
import { KeyCodes, classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>()

export const ONKEYDOWN_TIMEOUT_DURATION = 1000

@Component({
  components: { Label },
})
export class SliderBase extends BaseComponent<ISliderProps> {
  $refs!: {
    sliderLine: HTMLDivElement
  }
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) vertical!: boolean
  @Prop({ type: Boolean, default: false }) snapToStep!: boolean
  @Prop({ type: Number, default: 0 }) min!: number
  @Prop({ type: Number, default: 10 }) max!: number
  @Prop({ type: Number, default: 1 }) step!: number
  @Prop({ type: Number, default: null }) value!: number
  @Prop({ type: Number, default: null }) defaultValue!: number
  @Prop({ type: Boolean, default: false }) showValue!: boolean
  @Prop({ type: Boolean, default: false }) originFromZero!: boolean

  private internalValue?: number = this.value || this.defaultValue || this.min
  private renderedValue?: number = this.value || this.defaultValue || this.min

  private onKeyDownTimer = -1;

  get classNames () {
    const { className, disabled, vertical, renderedValue, internalValue, showValue, theme } = this
    return getClassNames(this.styles, {
      className,
      disabled,
      vertical,
      showTransitions: renderedValue === internalValue,
      showValue,
      theme: theme!,
    })
  }

  get thumbOffsetPercent () {
    const { min, max, renderedValue } = this
    return min === max ? 0 : ((renderedValue! - min!) / (max! - min!)) * 100
  }

  get zeroOffsetPercent () {
    const { min, max } = this
    return min! >= 0 ? 0 : (-min! / (max! - min!)) * 100
  }

  get lengthString () {
    return this.vertical ? 'height' : 'width'
  }

  private onMouseDown (event: any) {
    if (this.disabled) return
    if (event.type === 'mousedown') {
      window.addEventListener('mousemove', this.onMove, true)
      window.addEventListener('mouseup', this.onMouseUp, true)
    } else if (event.type === 'touchstart') {
      window.addEventListener('touchmove', this.onMove, true)
      window.addEventListener('touchend', this.onMouseUp, true)
    }
    this.onMove(event)
  }

  private onMouseUp (event: any) {
    if (this.disabled) return
    this.renderedValue = this.internalValue
    window.removeEventListener('mousemove', this.onMove, true)
    window.removeEventListener('mouseup', this.onMouseUp, true)
    window.removeEventListener('touchmove', this.onMove, true)
    window.removeEventListener('touchend', this.onMouseUp, true)
  }

  private onMove (event: any) {
    window.requestAnimationFrame(() => {
      const { max, min, step, vertical } = this
      const steps: number = (max! - min!) / step!
      const sliderPositionRect: ClientRect = this.$refs.sliderLine.getBoundingClientRect()
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
  }

  private getPosition (event: MouseEvent | TouchEvent, vertical: boolean | undefined): number | undefined {
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
  }

  private updateValue (value: number, renderedValue: number): void {
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
  }

  private onKeyDown (event: KeyboardEvent): void {
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
  }

  private clearOnKeyDownTimer (): void {
    clearTimeout(this.onKeyDownTimer)
  };

  private setOnKeyDownTimer (event: KeyboardEvent): void {
    this.onKeyDownTimer = setTimeout(() => {
    }, ONKEYDOWN_TIMEOUT_DURATION)
  };

  render () {
    const { classNames, disabled, originFromZero, vertical, zeroOffsetPercent, thumbOffsetPercent, lengthString, internalValue, css, label } = this

    // TODO(code) `originFromZero` fragments/spans look ugly; maybe could be improved
    return (
      <div class={classNames.root}>
        <Label class={classNames.titleLabel}>{label}</Label>

        <div class={classNames.container}>
          <div class={classNames.slideBox}
            tabindex={disabled ? void 0 : 0}
            onMousedown={this.onMouseDown}
            onKeydown={this.onKeyDown}>
            <div ref="sliderLine" class={classNames.line}>
              {originFromZero && (
                <span class= {classNames.zeroTick}
                  style={{ [vertical ? 'bottom' : 'left']: `${zeroOffsetPercent}%` }} />
              )}
              <span class= {classNames.thumb}
                style={{ [vertical ? 'bottom' : 'left']: `${thumbOffsetPercent}%` }} />

              {originFromZero && (
                <span class={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={{ [lengthString]: `${Math.min(thumbOffsetPercent, zeroOffsetPercent)}%` }} />
              )}
              {originFromZero && (
                <span class={css(classNames.lineContainer, classNames.activeSection)}
                  style={{ [lengthString]: `${Math.abs(zeroOffsetPercent - thumbOffsetPercent)}%` }} />
              )}
              {originFromZero && (
                <span class={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={{ [lengthString]: `${Math.min(100 - thumbOffsetPercent, 100 - zeroOffsetPercent)}%` }} />
              )}

              {!originFromZero && (
                <span class={css(classNames.lineContainer, classNames.activeSection)}
                  style={{ [lengthString]: `${thumbOffsetPercent}%` }} />
              )}
              {!originFromZero && (
                <span class={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={{ [lengthString]: `${100 - thumbOffsetPercent}%` }} />
              )}
            </div>
          </div>

          <Label class={classNames.valueLabel}>
            {this.$scopedSlots.value
              ? this.$scopedSlots.value({ value: internalValue })
              : internalValue
            }
          </Label>
        </div>
      </div>
    )
  }
}
