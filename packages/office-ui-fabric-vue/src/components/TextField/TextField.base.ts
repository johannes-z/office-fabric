import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import { Label, ILabelStyles, ILabelStyleProps } from '../Label'
import { ITextFieldProps, ITextFieldStyles, ITextFieldStyleProps } from './TextField.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>()

@Component({
  inheritAttrs: false,
})
export class TextFieldBase extends BaseComponent<ITextFieldProps> {
  $refs!: {
    textElement: HTMLTextAreaElement | HTMLInputElement
  }

  @Prop({ type: Boolean, default: false }) multiline!: boolean
  @Prop({ type: Boolean, default: null }) resizable!: boolean
  @Prop({ type: Boolean, default: null }) autoAdjustHeight!: boolean

  @Prop({ type: Boolean, default: false }) borderless!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) underlined!: boolean
  @Prop({ type: Boolean, default: false }) readonly!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: String, default: null }) errorMessage!: string
  @Prop({ type: String, default: null }) placeholder!: string
  @Prop({ type: String, default: null }) description!: string

  isFocused: boolean = false
  internalValue: string = this.value

  get classNames () {
    const {
      theme, className, disabled, isFocused: focused, required, multiline, label, borderless, underlined,
      resizable, autoAdjustHeight,
    } = this
    return getClassNames(this.styles, {
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

  @Watch('multiline')
  private async onMultilineChanged (newValue: boolean, oldValue: boolean) {
    const textElement = this.$refs.textElement
    const start = textElement.selectionStart || 0
    const end = textElement.selectionEnd || 0
    if ((newValue !== oldValue) && this.isFocused) {
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
    this.isFocused = true
    this.$refs.textElement.setSelectionRange(this.internalValue.length, this.internalValue.length)
  }

  private onInput (ev: InputEvent, value: string) {
    this.internalValue = value
    this.$emit('input', value)
    this.$emit('change', ev, value)
  }

  render (h: CreateElement) {
    const { classNames, required, label, errorMessage, disabled, multiline, internalValue, readonly, placeholder, resizable } = this

    const Component = multiline ? 'textarea' : 'input'

    const labelStyles = classNames.subComponentStyles
      ? (classNames.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
      : undefined

    const id = `TextField${this.uid}`

    const $label = label && h(Label, {
      attrs: {
        for: id,
        required: required,
      },
      props: {
        styles: labelStyles,
      },
    }, label)

    const $fieldGroup = h('div', { class: classNames.fieldGroup }, [
      h(Component, {
        ref: 'textElement',
        class: classNames.field,
        attrs: {
          ...this.$attrs,
          id: this.$attrs.id || id,
          value: internalValue,
          disabled: disabled,
          readonly: readonly,
          required: required,
          placeholder: placeholder,
          rows: +this.$attrs.rows || 1,
          type: 'text',
          autocomplete: 'off',
        },
        style: { resize: (resizable === false) && 'none' },
        on: {
          focus: this.onFocus,
          blur: () => (this.isFocused = false),
          input: ev => this.onInput(ev, ev.target.value),
        },
      }, internalValue),
    ])

    const $errorMessage = errorMessage && h('div', { class: classNames.description }, [
      h('div', { attrs: { role: 'alert' } }, [
        h('p', { class: classNames.errorMessage }, [
          h('span', errorMessage),
        ]),
      ]),
    ])

    return h('div', { class: classNames.root }, [
      h('div', { class: classNames.wrapper }, [
        $label,
        $fieldGroup,
      ]),
      $errorMessage,
    ])
  }
}
