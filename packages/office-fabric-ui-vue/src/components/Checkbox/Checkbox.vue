<template>
  <div :class="classNames.root">
    <input :id="`Checkbox${_uid}`"
           :class="classNames.input"
           v-bind="$attrs"
           type="checkbox"
           @input="internalValue = !internalValue">
    <Label :for="`Checkbox${_uid}`"
           :class-name="classNames.label">
      <div :class="classNames.checkbox">
        <Icon icon-name="CheckMark"
              :class-name="classNames.checkmark" />
      </div>
      <span v-if="label || $slots.default" :class="classNames.text">
        <slot>{{ label }}</slot>
      </span>
    </Label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import { Label } from '../Label/'
import { Icon } from '../Icon/'
import { ICheckboxProps, ICheckboxStyles } from './Checkbox.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { mergeStyles, concatStyleSets, concatStyleSetsWithProps } from '@uifabric/merge-styles'

const getClassNames = classNamesFunction<any, ICheckboxStyles>()

@Component({
  components: { Label, Icon },
  inheritAttrs: false,
})
export default class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxStyles> {
  @Model('input', { type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: 'start', validator: v => ['start', 'end'].indexOf(v) > -1 }) boxSide!: string

  private internalValue: boolean = this.checked

  get classNames () {
    const { theme, className, disabled, indeterminate, internalValue, boxSide } = this
    return getClassNames(this.styles, {
      theme,
      className,
      disabled,
      indeterminate,
      checked: internalValue,
      reversed: boxSide !== 'start',
      isUsingCustomLabelRender: true,
    })
  }

  @Watch('internalValue')
  private onValueChanged (value: boolean) {
    this.$emit('input', value)
  }
}
</script>
