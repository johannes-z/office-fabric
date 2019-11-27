<template>
  <div v-bind="css.root">
    <Label v-bind="css.titleLabel" v-text="label" />
    <div v-bind="css.container">
      <div v-bind="css.slideBox"
           :tabindex="disabled ? void 0 : 0"
           @mousedown="onMouseDown"
           @keydown="onKeyDown">
        <div ref="sliderLine" v-bind="css.line">
          <span v-bind="css.thumb" />
          <span :class="[css.lineContainer.class, css.activeSection.class]"
                :style="css.activeSection.style" />
          <span :class="[css.lineContainer.class, css.inactiveSection.class]"
                :style="css.inactiveSection.style" />
        </div>
      </div>
      <Label v-bind="css.valueLabel">
        <slot name="value" :value="internalValue">
          {{ internalValue }}
        </slot>
      </Label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Label from '../Label/Label.vue'
import { KeyCodes } from '@/util/KeyCodes'
import { ISliderProps, ISliderStyles } from './Slider.types'
import BaseComponent from '../BaseComponent'

export const ONKEYDOWN_TIMEOUT_DURATION = 1000

@Component({
  name: 'o-slider',
  components: { Label },
})
export default class Slider extends BaseComponent<ISliderProps, ISliderStyles> {
  $refs!: {
    sliderLine: HTMLDivElement
  }
  @Prop({ default: null }) label!: string
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) vertical!: boolean
  @Prop({ default: false }) snapToStep!: boolean
  @Prop({ default: 0 }) min!: number
  @Prop({ default: 10 }) max!: number
  @Prop({ default: 1 }) step!: number
  @Prop({ default: null }) value!: number
  @Prop({ default: null }) defaultValue!: number

  private internalValue?: number = this.value || this.defaultValue || this.min
  private renderedValue?: number = this.value || this.defaultValue || this.min

  private onKeyDownTimer = -1;

  created () {
    console.log(this.css)
  }

  get baseStyles (): ISliderStyles {
    const { $style, disabled, vertical, thumbOffsetPercent, lengthString } = this
    return {
      root: [
        'ms-Slider',
        $style.root,
        disabled && $style.disabled,
        vertical && $style.vertical,
      ],
      titleLabel: [
        $style.titleLabel,
      ],
      container: [
        'ms-Slider-container',
        $style.container,
      ],
      slideBox: [
        'ms-Slider-slideBox ms-Slider-showValue ms-Slider-showTransitions slideBox-390',
        $style.slideBox,
      ],
      line: [
        'ms-Slider-line',
        $style.line,
      ],
      thumb: [
        'ms-Slider-thumb',
        $style.thumb,
        {
          [vertical ? 'bottom' : 'left']: `${thumbOffsetPercent}%`,
        },
      ],
      lineContainer: [
        $style.lineContainer,
      ],
      activeSection: [
        'ms-Slider-active',
        $style.activeSection,
        { [lengthString]: `${thumbOffsetPercent}%` },
      ],
      inactiveSection: [
        'ms-Slider-inactive',
        $style.inactiveSection,
        { [lengthString]: `${100 - thumbOffsetPercent}%` },
      ],
      valueLabel: [
        'ms-Slider-value',
        $style.valueLabel,
      ],
      zeroTick: [

      ],
    }
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
}
</script>

<style lang="scss" module>
.root {
  font-weight: 400;
  user-select: none;
}

.titleLabel {
  font-weight: 600;
  color: rgb(50, 49, 48);
  box-sizing: border-box;
  box-shadow: none;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  display: block;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  overflow-wrap: break-word;
}
.valueLabel {
  font-size: 14px;
  font-weight: 600;
  color: rgb(50, 49, 48);
  box-sizing: border-box;
  box-shadow: none;
  margin-top: 0px;
  margin-right: 8px;
  margin-bottom: 0px;
  margin-left: 8px;
  display: block;
  padding-top: 5px;
  padding-right: 0px;
  padding-bottom: 5px;
  padding-left: 0px;
  overflow-wrap: break-word;
  flex-shrink: 1;
  width: 40px;
  line-height: 1;
  white-space: nowrap;
}
.container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.slideBox {
  position: relative;
  flex-grow: 1;
  line-height: 28px;
  display: flex;
  align-items: center;
  height: 28px;
  width: auto;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 8px;
  outline: transparent;
  background: transparent;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;

  &:hover {
    .thumb {
      border-width: 2px;
      border-style: solid;
      border-color: rgb(0, 90, 158);
      border-image: initial;
    }
    .activeSection {
      background-color: rgb(0, 120, 212);
    }
    .inactiveSection {
      background-color: rgb(222, 236, 249);
    }
  }
}
.line {
    display: flex;
    position: relative;
    width: 100%;
}
.thumb {
  box-sizing: border-box;
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  transform: translateX(-50%);
  border-width: 2px;
  border-style: solid;
  border-color: rgb(96, 94, 92);
  border-radius: 10px;
  background: rgb(255, 255, 255);
  transition: left 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
}
.lineContainer {
  box-sizing: border-box;
  height: 4px;
  border-radius: 4px;
}
.activeSection {
background: rgb(96, 94, 92);
  transition: width 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
}
.inactiveSection {
background: rgb(200, 198, 196);
    transition: width 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
}
.root:not(.vertical) {
  .thumb {
    top: -6px;
  }
}
.vertical {
  margin-right: 8px;

  .titleLabel {
    font-weight: 600;
    color: rgb(50, 49, 48);
    box-sizing: border-box;
    box-shadow: none;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    display: block;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    overflow-wrap: break-word;
  }
  .container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: column;
    height: 100%;
    text-align: center;
    margin-top: 8px;
    margin-right: 0px;
    margin-bottom: 8px;
    margin-left: 0px;
  }
  .slideBox {
    position: relative;
    flex-grow: 1;
    line-height: 28px;
    display: flex;
    align-items: center;
    height: 100%;
    width: 28px;
    padding-top: 8px;
    padding-right: 0px;
    padding-bottom: 8px;
    padding-left: 0px;
    outline: transparent;
    background: transparent;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
  }
  .line {
    display: flex;
    position: relative;
    height: 100%;
    width: 4px;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
    flex-direction: column-reverse;
  }
  .thumb {
    box-sizing: border-box;
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: -6px;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
    transform: translateY(8px);
    border-width: 2px;
    border-style: solid;
    border-color: rgb(96, 94, 92);
    border-radius: 10px;
    background: rgb(255, 255, 255);
    transition: left 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
  }
  .lineContainer {
    box-sizing: border-box;
    width: 4px;
    height: 100%;
  }
  .valueLabel {
    font-size: 14px;
    font-weight: 600;
    color: rgb(50, 49, 48);
    box-sizing: border-box;
    box-shadow: none;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
    display: block;
    padding-top: 5px;
    padding-right: 0px;
    padding-bottom: 5px;
    padding-left: 0px;
    overflow-wrap: break-word;
    flex-shrink: 1;
    width: 40px;
    line-height: 1;
    white-space: nowrap;
  }
}
.disabled {
  pointer-events: none;
  .thumb {
    border-color: rgb(200, 198, 196);
    border-radius: 10px;
    background: rgb(255, 255, 255);
  }
  .activeSection {
    background: rgb(161, 159, 157);
  }
  .inactiveSection {
    background: rgb(243, 242, 241);
  }
  .titleLabel,
  .valueLabel {
    color: rgb(161, 159, 157);
  }
}
</style>
