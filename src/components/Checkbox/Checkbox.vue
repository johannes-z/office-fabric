<template>
  <div :class="classNames.root">
    <input :id="`Checkbox${_uid}`"
           :class="classNames.input"
           v-bind="$attrs"
           type="checkbox"
           @input="internalValue = !internalValue"
           v-on="$listeners">
    <Label :for="`Checkbox${_uid}`"
           :class-name="classNames.label"
           :class="classNames.label">
      <div :class="classNames.checkbox">
        <Icon icon-name="CheckMark"
              :class-name="classNames.checkmark" />
      </div>
      <span :class="classNames.text">
        <slot>{{ label }}</slot>
      </span>
    </Label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import Label from '../Label/Label.vue'
import Icon from '../Icon/Icon.vue'
import { ICheckboxProps, ICheckboxStyles } from './Checkbox.types'
import BaseComponent from '../BaseComponent'
import { getStyles } from './Checkbox.styles'
import { classNamesFunction } from '../../utilities'

const getClassNames = classNamesFunction<any, ICheckboxStyles>()

@Component({
  components: { Label, Icon },
  inheritAttrs: false,
})
export default class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxStyles> {
  @Model('input', { default: false }) checked!: boolean
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) indeterminate!: boolean
  @Prop({ default: false }) required!: boolean
  @Prop({ default: null }) label!: string
  @Prop({ default: 'start', validator: v => ['start', 'end'].indexOf(v) > -1 }) boxSide!: string

  private internalValue: boolean = this.checked

  get classNames () {
    const { theme, className, disabled, indeterminate, internalValue, boxSide } = this
    return getClassNames(getStyles, {
      theme: theme!,
      className,
      disabled,
      indeterminate,
      checked: internalValue,
      reversed: boxSide !== 'start',
      isUsingCustomLabelRender: false,
    })
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }
}
</script>
