import { getId, classNamesFunction } from '@fluentui-vue/utilities'
import { asSlotProps, useStylingProps } from '@/utils'
import { IProcessedStyleSet, IStyleFunctionOrObject } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { Label } from '../Label'
import { ILabelStyleProps, ILabelStyles } from '../Label/Label.types'
import { ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types'

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>()

const COMPONENT_NAME = 'TextField'

export const TextFieldBase = Vue.extend({
  name: 'TextFieldBase',

  inheritAttrs: false,

  props: {
    ...useStylingProps(),

    multiline: { type: Boolean, default: false },
    resizable: { type: Boolean, default: null },
    autoAdjustHeight: { type: Boolean, default: null },

    borderless: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    underlined: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: null },
    value: { type: String, default: '' },
    errorMessage: { type: String, default: null },
    placeholder: { type: String, default: null },
    description: { type: String, default: null },
  },

  data () {
    return {
      isFocused: false,
      internalValue: this.value || '',
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<ITextFieldStyles> {
      return getClassNames(this.styles, {
        theme: this.theme,
        className: this.className,
        disabled: this.disabled,
        focused: this.focused,
        required: this.required,
        multiline: this.multiline,
        hasLabel: !!this.label,
        borderless: this.borderless,
        underlined: this.underlined,
        hasIcon: false,
        resizable: this.resizable !== false,
        hasErrorMessage: !!this.errorMessage,
        inputClassName: '',
        autoAdjustHeight: this.autoAdjustHeight,
      })
    },
    descriptionId () {
      return getId(COMPONENT_NAME + 'Description')
    },
    fallbackId () {
      return getId(COMPONENT_NAME)
    },
    labelId () {
      return getId(COMPONENT_NAME + 'Label')
    },
  },

  watch: {
    value (newValue: string): void {
      this.internalValue = newValue
    },
    async multiline (newValue: boolean, oldValue: boolean) {
      const textElement = this.$refs.textElement as HTMLTextAreaElement
      const start = textElement.selectionStart || 0
      const end = textElement.selectionEnd || 0
      if ((newValue !== oldValue) && this.isFocused) {
        await this.$nextTick()
        ;(this.$refs.textElement as HTMLTextAreaElement).focus()
        ;(this.$refs.textElement as HTMLTextAreaElement).setSelectionRange(start, end)
      }
    },
  },

  mounted () {
    this.adjustInputHeight()
  },

  updated () {
    this.adjustInputHeight()
  },

  methods: {
    adjustInputHeight (): void {
      if (this.$refs.textElement && this.autoAdjustHeight && this.multiline) {
        const textField = this.$refs.textElement as HTMLTextAreaElement
        textField.style.height = ''
        textField.style.height = textField.scrollHeight + 'px'
      }
    },
    async onFocus () {
      this.isFocused = true
      ;(this.$refs.textElement as HTMLTextAreaElement).setSelectionRange(this.internalValue.length, this.internalValue.length)
    },
    onInput (ev: InputEvent, value: string) {
      this.internalValue = value
      this.$emit('input', value)
      this.$emit('change', ev, value)
    },
  },

  render (h: CreateElement): VNode {
    const { classNames, required, label, errorMessage, disabled, multiline, internalValue, readonly, placeholder, resizable } = this

    const Component = multiline ? 'textarea' : 'input'

    const id = this.$attrs.id || this.fallbackId

    const slotProps = asSlotProps({
      root: {
        class: classNames.root,
      },
      wrapper: {
        class: classNames.wrapper,
      },
      description: {
        class: classNames.description,
      },
      fieldGroup: {
        class: classNames.fieldGroup,
      },
      field: {
        ref: 'textElement',
        class: classNames.field,
        attrs: {
          ...this.$attrs,
          id: id,
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
      },
    })

    const onRenderLabel = (props: ITextFieldProps) => {
      const { label, disabled, required } = props

      const labelStyles = classNames.subComponentStyles
        ? (classNames.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
        : undefined

      if (!label) return null

      return h(Label, {
        attrs: {
          id: this.labelId,
          for: id,
        },
        props: {
          styles: labelStyles,
          disabled: disabled,
          required: required,
        },
      }, label)
    }

    const onRenderDescription = (props: ITextFieldProps) => {
      if (!this.description) return null
      return h('span', slotProps.description, this.description)
    }

    const $label = (this.$scopedSlots.label ?? onRenderLabel)(this.$props)

    const $fieldGroup = h('div', slotProps.fieldGroup, [
      h(Component, slotProps.field, internalValue),
    ])

    const $errorMessage = errorMessage && h('div', slotProps.description, [
      h('div', { attrs: { role: 'alert' } }, [
        h('p', { class: classNames.errorMessage }, [
          h('span', errorMessage),
        ]),
      ]),
    ])

    return h('div', slotProps.root, [
      h('div', slotProps.wrapper, [
        $label,
        $fieldGroup,
      ]),
      h('span', { attrs: { id: this.descriptionId } }, [
        (this.$scopedSlots.description ?? onRenderDescription)(this.$props),
        $errorMessage,
      ]),
    ])
  },
})
