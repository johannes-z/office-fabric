<template>
  <div :class="[
    $style.root,
    disabled && $style.disabled,
    isActive && $style.active,
  ]">
    <Label v-if="label"
           :for="`SpinButton${_uid}`"
           :class="$style.label"
           v-text="label" />
    <div :class="$style.wrapper">
      <input :id="`SpinButton${_uid}`"
             :class="$style.field"
             :value="internalValue"
             type="text"
             role="spinbutton"
             @focus="isActive = true"
             @blur="isActive = false"
             @input="internalValue = $event.target.value">
      <span :class="$style.spinButtons">
        <IconButton :class="$style.increase"
                    icon-name="ChevronUpSmall"
                    @mousedown.native="startSpin(1)"
                    @mouseup.native="stopSpin" />
        <IconButton :class="$style.decrease"
                    icon-name="ChevronDownSmall"
                    @mousedown.native="startSpin(-1)"
                    @mouseup.native="stopSpin" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import IconButton from '../Button/IconButton.vue'

function calculatePrecision (value: number | string): number {
  /**
   * Group 1:
   * [1-9]([0]+$) matches trailing zeros
   * Group 2:
   * \.([0-9]*) matches all digits after a decimal point.
   */
  const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value))
  if (!groups) {
    return 0
  }
  if (groups[1]) {
    return -groups[1].length
  }
  if (groups[2]) {
    return groups[2].length
  }
  return 0
}

function precisionRound (value: number, precision: number, base: number = 10): number {
  const exp = Math.pow(base, precision)
  return Math.round(value * exp) / exp
}

@Component({
  components: { IconButton },
})
export default class SpinButton extends Vue {
  @Prop({ default: null }) label!: string
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean
  @Prop({ default: 0 }) defaultValue!: number
  @Prop({ default: null }) value!: number

  @Prop({ default: 0 }) min!: number
  @Prop({ default: 10 }) max!: number
  @Prop({ default: 1 }) step!: number

  internalValue: number = this.value || this.defaultValue

  isActive: boolean = false
  private INITIAL_STEP_DELAY = 400;
  private STEP_DELAY = 75;
  private interval!: number
  private timeout!: number

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }

  private updateValue (value: number) {
    let newValue = precisionRound(value, this.precision)
    this.internalValue = newValue
    return newValue
  }

  private onIncrement () {
    let newValue = Math.min(this.internalValue + this.step, this.max)
    return this.updateValue(newValue)
  }

  private onDecrement () {
    let newValue = Math.max(this.internalValue - this.step, this.min)
    return this.updateValue(newValue)
  }

  private startSpin (dir: number) {
    let newValue = dir === 1 ? this.onIncrement() : this.onDecrement()
    newValue = precisionRound(newValue, this.precision)
    this.internalValue = newValue

    this.timeout = setTimeout(() => {
      this.interval = setInterval(
        () => {
          let newValue = dir === 1 ? this.onIncrement() : this.onDecrement()
          newValue = precisionRound(newValue, this.precision)
          this.internalValue = newValue
        },
        this.STEP_DELAY
      )
    }, this.INITIAL_STEP_DELAY)
  }

  get precision () {
    const precision = Math.max(calculatePrecision(this.step), 0)
    return precision
  }

  private stopSpin () {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" module>
@mixin activate($activator, $target) {
  #{$activator} {
    #{$target} {
      @content;
    }
  }
}

@mixin onInputHover($activator: "&:hover", $target: ".wrapper") {
  @include activate("&:hover", ".wrapper") {
    border-color: rgb(50, 49, 48);
  }
}

@mixin inputDisabled {
  @include activate("&", ".wrapper") {
    background: rgb(255, 255, 255);
    border-color: rgb(243, 242, 241);
  }
  @include activate("&", ".field") {
    color: rgb(161, 159, 157);
    background: none rgb(243, 242, 241);
    border-color: rgb(243, 242, 241);
  }
}

@mixin disabled {
  user-select: none;
  pointer-events: none;
  @include inputDisabled;
  @include activate("&", ".spinButtons") {
    background-color: rgb(243, 242, 241);
    border-color: rgb(243, 242, 241);
  }
  @include activate("&", ".increase") {
    color: rgb(161, 159, 157);
  }
  @include activate("&", ".decrease") {
    color: rgb(161, 159, 157);
  }
}

.root {
  font-size: 14px;
  width: 100%;
  min-width: 86px;
  outline: none;

  @include onInputHover;
  &.disabled {
    @include disabled;
  }
}
.root.active {
  .wrapper:after {
    pointer-events: none;
    content: "";
    position: absolute;
    left: -1px;
    top: -1px;
    bottom: -1px;
    right: -1px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(0, 120, 212);
    border-image: initial;
    border-radius: 2px;
  }
}
.label {
  display: inline-flex;
  align-items: center;
  height: 32px;
  float: left;
  margin-right: 10px;
}
.wrapper {
  display: flex;
  position: relative;
  box-sizing: border-box;
  height: 32px;
  min-width: 86px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(138, 136, 134);
  border-image: initial;
  border-radius: 2px;
}
.field {
  box-sizing: border-box;
  box-shadow: none;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  font-size: 14px;
  color: rgb(50, 49, 48);
  height: 100%;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 8px;
  display: block;
  min-width: 61px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: text;
  user-select: text;
  border-style: none;
  flex: 1 1 0%;
  outline: 0px;
  overflow: hidden;
  border-radius: 2px 0px 0px 2px;
}

.spinButtons {
  display: block;
  height: 100%;
  cursor: default;
}

.increase {
  border-radius: 0px 2px 0px 0px;
}
.decrease {
  border-radius: 0px 0px 2px;
}

.increase,
.decrease {
  position: relative;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  display: block;
  text-align: center;
  cursor: default;
  vertical-align: top;
  padding: 0;
  width: 23px;
  height: 50%;
  background-color: transparent;
  color: rgb(96, 94, 92);
  user-select: none;
  outline: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;

  :global(.ms-Icon) {
    font-size: 8px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    flex-shrink: 0;
  }
}

</style>
