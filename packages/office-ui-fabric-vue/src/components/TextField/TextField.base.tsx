import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import { Label, ILabelStyles, ILabelStyleProps } from '../Label/'
import { ITextFieldProps, ITextFieldStyles, ITextFieldStyleProps } from './TextField.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IStyleFunctionOrObject } from '@uifabric/merge-styles'

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>()

@Component({
  components: { Label },
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

  isActive: boolean = false
  internalValue: string = this.value

  get classNames () {
    const { theme, className, disabled, isActive: focused, required, multiline, label, borderless, underlined,
      resizable, autoAdjustHeight } = this
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

  private onInput (ev: InputEvent, value: string) {
    this.internalValue = value
    this.$emit('input', value)
    this.$emit('change', ev, value)
  }

  render () {
    const { classNames, required, label, errorMessage, disabled, multiline, internalValue, readonly, placeholder, resizable } = this

    const Component = multiline ? 'textarea' : 'input'

    const labelStyles = classNames.subComponentStyles
      ? (classNames.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
      : undefined

    return (

      <div class={classNames.root}>
        <div class={classNames.wrapper}>
          {label && (
            <Label
              styles={labelStyles}
              for={`TextField${this.uid}`}
              required={required}>{label}</Label>
          )}
          <div class={classNames.fieldGroup}>
            <Component
              id={this.$attrs.id || `TextField${this.uid}`}
              ref="textElement"
              class={classNames.field}
              value={internalValue}
              {...{ attrs: this.$attrs }}
              disabled={disabled}
              readonly={readonly}
              required={required}
              placeholder={placeholder}
              rows={+this.$attrs.rows || 1}
              type="text"
              autocomplete="off"
              style={{ resize: (resizable === false) && 'none' }}
              onFocus={this.onFocus}
              onBlur={() => (this.isActive = false)}
              onInput={ev => this.onInput(ev, ev.target.value)}>{internalValue}</Component>
          </div>
        </div>
        {errorMessage && (
          <div class={classNames.description}>
            <div role="alert">
              <p class={classNames.errorMessage}>
                <span>{errorMessage}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
}
