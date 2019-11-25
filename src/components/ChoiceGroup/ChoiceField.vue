<template>
  <div :class="[
    $style.root,
    checked && $style.checked,
    disabled && $style.disabled,
  ]">
    <div :class="$style.wrapper">
      <input :id="`ChoiceGroup${_uid}-${id}`"
             :name="`ChoiceGroup${_uid}`"
             :class="$style.input"
             :disabled="disabled"
             type="radio">

      <label :class="$style.field">
        <span :class="$style.label">{{ text }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class ChoiceField extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ default: null }) text!: string
  @Prop({ default: false }) disabled!: boolean

  @Prop({ default: false }) checked!: boolean
}
</script>

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: rgb(50, 49, 48);
  min-height: 26px;
  position: relative;
  margin-top: 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}
.checked:not(.disabled) {
  .field {
    border-color: rgb(0, 120, 212);
    &:before {
      border-color: rgb(0, 120, 212);
    }
    &:after {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      left: 5px;
      right: 0px;
      transition-property: border-width;
      transition-duration: 200ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.23, 1);
      box-sizing: border-box;
      top: 5px;
      border-radius: 50%;
      border-width: 5px;
      border-style: solid;
      border-color: rgb(0, 120, 212);
    }
  }
}
.disabled {
  pointer-events: none;
  .field {
    &:before {
      border-color: rgb(200, 198, 196);
    }
  }
  .label {
    color: rgb(161, 159, 157);
  }
}
.input {
  position: absolute;
  opacity: 0;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
}
.field {
  display: inline-block;
  cursor: pointer;
  margin-top: 0px;
  position: relative;
  vertical-align: top;
  min-height: 20px;
  user-select: none;

  &:before {
    content: "";
    display: inline-block;
    background-color: rgb(255, 255, 255);
    width: 20px;
    height: 20px;
    font-weight: normal;
    position: absolute;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    transition-property: border-color;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.23, 1);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(50, 49, 48);
    border-radius: 50%;
  }

  &:after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    left: 10px;
    right: 0px;
    transition-property: border-width;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.23, 1);
    box-sizing: border-box;
    border-radius: 50%;
  }
}
.label {
  display: inline-block;
  padding-left: 26px;
}
</style>
