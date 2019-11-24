<template>
  <div :class="[
    $style.root,
    disabled && $style.disabled,
    internalValue && $style.checked,
    'ms-Checkbox'
  ]">
    <input :id="`Checkbox${_uid}`"
           :class="$style.input"
           v-bind="$attrs"
           type="checkbox"
           @input="internalValue = !internalValue">
    <Label :for="`Checkbox${_uid}`" :class="$style.label">
      <div :class="$style.checkbox">
        <Icon icon-name="CheckMark"
              :class="$style.checkmark" />
      </div>
      <span :class="$style.text">
        <slot>{{ label }}</slot>
      </span>
    </Label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import Label from '../Label/Label.vue'
import Icon from '../Icon/Icon.vue'

@Component({
  components: { Label, Icon },
  inheritAttrs: false,
})
export default class Checkbox extends Vue {
  @Model('input', { default: false }) checked!: boolean
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean
  @Prop({ default: null }) label!: string

  private internalValue: boolean = this.checked

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;

  &:not(.checked):hover {
    .checkmark {
      color: rgb(96, 94, 92);
      opacity: 1;
    }
  }
}
.checked {
  .checkbox {
    background: rgb(0, 120, 212);
    border-color: rgb(0, 120, 212);
  }
  .checkmark {
    opacity: 1;
    color: rgb(255, 255, 255);
  }
  &:hover {
    .checkbox {
      background: rgb(0, 90, 158);
      border-color: rgb(0, 90, 158);
    }
  }
}
.root.disabled {
  pointer-events: none;
  .checkbox {
    border-color: rgb(200, 198, 196);
  }
  .text {
    color: rgb(161, 159, 157);
  }
  &.checked {
    .checkbox {
      background: rgb(200, 198, 196);
    }
  }
}

.input {
  position: absolute;
  opacity: 0;
  background: none;
}

.label {
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  text-align: left;
  user-select: none;
  &:before {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    content: "";
    pointer-events: none;
  }
}

.checkbox {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  box-sizing: border-box;
  transition-property: background, border, border-color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.23, 1);
  margin-right: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(50, 49, 48);
  border-image: initial;
  border-radius: 2px;
  overflow: hidden;
}

.checkmark {
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  speak: none;
  font-family: FabricMDL2Icons;
  opacity: 0;
  color: rgb(255, 255, 255);
}

.text {
  color: rgb(50, 49, 48);
  font-size: 14px;
  line-height: 20px;
  margin-left: 4px;
}

</style>
