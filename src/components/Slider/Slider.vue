<template>
  <div :class="$style.root">
    <Label :class="$style.titleLabel" v-text="label" />
    <div :class="$style.container">
      <div :class="$style.slideBox"
           @mousedown="onMouseDown">
        <div ref="sliderLine" :class="$style.line">
          <span :class="$style.thumb"
                :style="{ left: `${thumbOffsetPercent}%`}" />
          <span :class="[$style.lineContainer, $style.activeSection]"
                :style="{ width: `${thumbOffsetPercent}%`}" />
          <span :class="[$style.lineContainer, $style.inactiveSection]"
                :style="{ width: `${100 - thumbOffsetPercent}%`}" />
        </div>
      </div>
      <Label :class="$style.valueLabel" v-text="internalValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Label from '../Label/Label.vue'

@Component({
  components: { Label },
})
export default class Slider extends Vue {
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

  internalValue?: number = this.value
  renderedValue?: number = this.value

  get thumbOffsetPercent () {
    const { min, max, renderedValue } = this
    return min === max ? 0 : ((renderedValue! - min!) / (max! - min!)) * 100
  }

  get zeroOffsetPercent () {
    const { min, max } = this
    return min! >= 0 ? 0 : (-min! / (max! - min!)) * 100
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
      const { max, min, step, vertical } = this.$props
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
      this.internalValue = internalValue
      this.renderedValue = renderedValue
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
    const { step, snapToStep } = this.$props
    let numDec = 0
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++
      }
    }
    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(value.toFixed(numDec))
    const valueChanged = roundedValue !== this.value

    if (snapToStep) {
      renderedValue = roundedValue
    }

    this.internalValue = roundedValue
    this.renderedValue = renderedValue
  }
}
</script>

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  user-select: none;
}
.titleLabel {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
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
  top: -6px;
  transform: translateX(-50%);
  border-width: 2px;
  border-style: solid;
  border-color: rgb(96, 94, 92);
  border-radius: 10px;
  background: rgb(255, 255, 255);
  transition: left 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;

  left: 25%;
}
.lineContainer {
  box-sizing: border-box;
  height: 4px;
  width: 100%;
  border-radius: 4px;
}
.activeSection {
background: rgb(96, 94, 92);
  transition: width 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
      width: 25%;
}
.inactiveSection {
background: rgb(200, 198, 196);
    transition: width 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
        width: 75%;
}
</style>
