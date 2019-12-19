<template>
  <div :class="classNames.root">
    <div :class="classNames.iconContainer"
         role="search">
      <Icon :class-name="classNames.icon" :icon-name="iconName" />
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
      @focus="isActive = true"
      @blur="isActive = false"
      @keydown.enter="submit"
      @keydown.esc="clearInput">
    <div v-if="internalValue"
         :class="classNames.clearButton">
      <IconButton icon-name="Clear" @click.native="clearInput" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon/'
import { IconButton } from '../Button/'
import { ISearchBoxProps, ISearchBoxStyles } from './SearchBox.types'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'

@Component({
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export default class SearchBox extends BaseComponent<ISearchBoxProps, ISearchBoxStyles> {
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
  }

  submit () {
    this.$emit('submit', this.internalValue)
  }
  clearInput () {
    this.internalValue = ''
    this.$refs.input.focus()
  }
}
</script>
