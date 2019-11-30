<template>
  <div :class="classNames.root">
    <div :class="classNames.wrapper">
      <Label v-if="label"
             :class="classNames.label"
             :for="`TextField${_uid}`"
             :required="required"
             v-text="label" />
      <div :class="classNames.fieldGroup">
        <component :is="multiline ? 'textarea' : 'input'"
                   :id="`TextField${_uid}`"
                   ref="textElement"
                   :class="classNames.field"
                   :value="internalValue"
                   v-bind="$attrs"
                   :disabled="disabled"
                   :readonly="readonly"
                   :required="required"
                   :placeholder="placeholder"
                   :rows="$attrs.rows || 1"
                   type="text"
                   autocomplete="off"
                   :style="{ resize: (resizable === false) && 'none' }"
                   @focus="onFocus"
                   @blur="isActive = false"
                   @input="internalValue = $event.target.value"
                   v-text="internalValue" />
      </div>
    </div>
    <div v-if="errorMessage" :class="classNames.description">
      <div role="alert">
        <p :class="classNames.errorMessage">
          <span>{{ errorMessage }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import Label from '@/components/Label/Label.vue'
import { ITextFieldProps, ITextFieldStyles } from './TextField.types'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './TextField.styles'

@Component({
  components: { Label },
  inheritAttrs: false,
})
export default class TextField extends BaseComponent<ITextFieldProps, ITextFieldStyles> {
  $refs!: {
    textElement: HTMLTextAreaElement | HTMLInputElement
  }
  @Prop({ default: false }) multiline!: boolean
  @Prop({ default: null }) resizable!: boolean
  @Prop({ default: null }) autoAdjustHeight!: boolean

  @Prop({ default: false }) borderless!: boolean
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) underlined!: boolean
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: false }) required!: boolean
  @Prop({ default: null }) label!: string
  @Prop({ default: '' }) value!: string
  @Prop({ default: null }) errorMessage!: string
  @Prop({ default: null }) placeholder!: string
  @Prop({ default: null }) description!: string

  isActive: boolean = false
  internalValue: string = this.value

  get classNames () {
    const { theme, className, disabled, isActive: focused, required, multiline, label, borderless, underlined,
      resizable, autoAdjustHeight } = this
    return getClassNames(getStyles, {
      theme,
      className,
      disabled,
      focused,
      required,
      multiline,
      hasLabel: !!label,
      borderless,
      underlined,
      hasIcon: false,
      resizable: resizable !== false,
      hasErrorMessage: !!this.errorMessage,
      inputClassName: '',
      autoAdjustHeight,
    })
  }

  mounted () {
    this.adjustInputHeight()
  }

  updated () {
    this.adjustInputHeight()
  }

  @Watch('value')
  private onPropValueChanged (newValue: string) {
    this.internalValue = newValue
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }

  @Watch('multiline')
  private async onMultilineChanged (newValue: boolean, oldValue: boolean) {
    const textElement = this.$refs.textElement
    const start = textElement.selectionStart || 0
    const end = textElement.selectionEnd || 0
    if ((newValue !== oldValue) && this.isActive) {
      await this.$nextTick()
      this.$refs.textElement.focus()
      this.$refs.textElement.setSelectionRange(start, end)
    }
  }

  private adjustInputHeight (): void {
    if (this.$refs.textElement && this.autoAdjustHeight && this.multiline) {
      const textField = this.$refs.textElement
      textField.style.height = ''
      textField.style.height = textField.scrollHeight + 'px'
    }
  }

  private async onFocus () {
    this.isActive = true
    this.$refs.textElement.setSelectionRange(this.internalValue.length, this.internalValue.length)
  }
}
</script>
