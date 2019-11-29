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
      @focus="isActive = true"
      @blur="isActive = false"
      @keydown.enter="submit"
      @keydown.esc="clearInput">
    <div
      v-if="internalValue"
      :class="classNames.clearButton">
      <IconButton icon-name="Clear" @click.native="clearInput" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'
import IconButton from '../Button/IconButton.vue'
import { ISearchBoxProps, ISearchBoxStyles } from './SearchBox.types'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './SearchBox.styles'

@Component({
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export default class SearchBox extends BaseComponent<ISearchBoxProps, ISearchBoxStyles> {
  $refs!: {
    input: HTMLInputElement
  }
  @Prop({ default: false }) underlined?: boolean
  @Prop({ default: null }) defaultValue?: string
  @Prop({ default: 'Search' }) placeholder?: string
  @Prop({ default: null }) value!: string
  @Prop({ default: false }) disableAnimation?: boolean
  @Prop({ default: false }) disabled?: boolean
  @Prop({ default: 'Search' }) iconName!: string

  isActive: boolean = false
  internalValue: string = this.value

  get classNames () {
    const { theme, underlined, disabled, isActive, className, disableAnimation, internalValue } = this
    return getClassNames(getStyles, {
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
