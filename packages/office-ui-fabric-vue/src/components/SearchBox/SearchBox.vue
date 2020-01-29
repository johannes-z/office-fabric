<template>
  <div :class="classNames.root">
    <div :class="classNames.iconContainer"
         role="search">
      <Icon :class="classNames.icon" :icon-name="iconName" />
    </div>
    <input
      ref="input"
      v-bind="$attrs"
      :class="classNames.field"
      :disabled="disabled"
      :value="internalValue"
      :area-label="placeholder"
      :placeholder="placeholder"
      @input="internalValue = $event.target.value"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="submit"
      @keydown.esc="onEscape">
    <div v-if="internalValue"
         :class="classNames.clearButton">
      <IconButton
        :styles="{ root: { height: 'auto' }, icon: { fontSize: '12px' } }"
        :icon-props="{ iconName: 'Clear' }"
        @click.native="clearInput" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon/'
import { IconButton } from '../Button/'
import { ISearchBoxProps, ISearchBoxStyles } from './SearchBox.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component({
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export default class SearchBox extends BaseComponent {
  $refs!: {
    input: HTMLInputElement
  }
  @Prop({ type: Boolean, default: false }) underlined?: boolean
  @Prop({ type: String, default: null }) defaultValue?: string
  @Prop({ type: String, default: 'Search' }) placeholder?: string
  @Prop({ type: String, default: null }) value!: string
  @Prop({ type: Boolean, default: false }) disableAnimation?: boolean
  @Prop({ type: Boolean, default: false }) disabled?: boolean
  @Prop({ type: String, default: 'Search' }) iconName!: string

  isActive: boolean = false
  internalValue: string = this.value

  get classNames () {
    const { theme, underlined, disabled, isActive, className, disableAnimation, internalValue } = this
    return getClassNames(this.styles, {
      theme: theme!,
      className,
      underlined,
      hasFocus: isActive,
      disabled,
      hasInput: internalValue == null ? false : internalValue.length > 0,
      disableAnimation,
    })
  }

  @Watch('value')
  private onPropValueChanged (newValue: string) {
    this.internalValue = newValue
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
    this.$emit('change', value)
  }

  submit () {
    this.$emit('search', this.internalValue)
  }

  onEscape (e: KeyboardEvent) {
    this.$emit('escape', e)
    if (e.defaultPrevented) return
    this.clearInput()
  }

  clearInput (e?: MouseEvent) {
    this.$emit('clear', e)
    if (e && e.defaultPrevented) return
    this.internalValue = ''
    this.$refs.input.focus()
  }

  private onFocus (e: FocusEvent) {
    this.$emit('focus', e)
    if (e.defaultPrevented) return
    this.isActive = true
  }

  private onBlur (e: FocusEvent) {
    this.$emit('blur', e)
    if (e.defaultPrevented) return
    this.isActive = false
  }
}
</script>
