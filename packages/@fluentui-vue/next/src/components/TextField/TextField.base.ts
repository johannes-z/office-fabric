import { classNamesFunction, getId } from '@fluentui-vue/utilities'
import type { IStyleFunctionOrObject } from '@fluentui/merge-styles'
import type { Ref } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, onUpdated, ref, toRefs, watch } from 'vue'
import { Label } from '../Label'
import type { ILabelStyleProps, ILabelStyles } from '../Label/Label.types'
import type { ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types'
import { asSlotProps, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ITextFieldStyleProps, ITextFieldStyles>()

const COMPONENT_NAME = 'TextField'

export const TextFieldBase = defineComponent({
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
    defaultValue: { type: String, default: '' },
    errorMessage: { type: String, default: null },
    placeholder: { type: String, default: null },
    description: { type: String, default: null },

    modelValue: { type: String, default: '' },
  },

  setup(props, { attrs, slots, emit, expose }) {
    const {
      modelValue,
      styles,
      theme,
      className,
      disabled,
      focused,
      required,
      multiline,
      label,
      borderless,
      underlined,
      resizable,
      errorMessage,
      autoAdjustHeight,
      readonly,
      placeholder,
      description,
      defaultValue,
    } = toRefs(props)

    const isFocused = ref(focused.value)
    const internalValue = ref(modelValue.value || defaultValue.value || '')

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      disabled: disabled.value,
      focused: isFocused.value,
      required: required.value,
      multiline: multiline.value,
      hasLabel: !!label.value,
      borderless: borderless.value,
      underlined: underlined.value,
      hasIcon: false,
      resizable: resizable.value !== false,
      hasErrorMessage: !!errorMessage.value,
      inputClassName: '',
      autoAdjustHeight: autoAdjustHeight.value,
    }))

    const descriptionId = getId(`${COMPONENT_NAME}Description`)
    const fallbackId = getId(COMPONENT_NAME)
    const labelId = getId(`${COMPONENT_NAME}Label`)

    const textElementRef = ref<HTMLTextAreaElement | null>(null)

    watch(modelValue, (value: string) => {
      internalValue.value = value
    })

    watch(multiline, async (newValue: boolean, oldValue: boolean) => {
      const start = textElementRef.value?.selectionStart || 0
      const end = textElementRef.value?.selectionEnd || 0
      if ((newValue !== oldValue) && isFocused.value) {
        await nextTick()
        textElementRef.value?.focus()
        textElementRef.value?.setSelectionRange(start, end)
      }
    })

    const adjustInputHeight = (): void => {
      if (textElementRef.value && autoAdjustHeight.value && multiline.value) {
        const textField = textElementRef.value
        textField.style.height = ''
        textField.style.height = `${textField.scrollHeight}px`
      }
    }

    const onInput = (ev: InputEvent, value: string) => {
      adjustInputHeight()
      internalValue.value = value
      emit('update:modelValue', internalValue.value)
      emit('change', ev, internalValue.value)
    }

    onMounted(adjustInputHeight)

    expose({
      focus: () => {
        if (!textElementRef.value)
          return
        textElementRef.value.focus()
      },
      blur: () => {
        if (!textElementRef.value)
          return
        textElementRef.value.blur()
      },
    })

    const Component = computed(() => multiline.value ? 'textarea' : 'input')

    const id = attrs.id || fallbackId

    const slotProps = computed(() => asSlotProps({
      root: {
        class: classNames.value.root,
      },
      wrapper: {
        class: classNames.value.wrapper,
      },
      description: {
        class: classNames.value.description,
      },
      fieldGroup: {
        class: classNames.value.fieldGroup,
      },
      field: {
        class: classNames.value.field,
        ...attrs,
        ref: textElementRef,
        id,
        value: internalValue.value,
        disabled: disabled.value,
        readonly: readonly.value,
        required: required.value,
        placeholder: placeholder.value,
        rows: attrs.rows ? (+attrs.rows || 1) : 1,
        type: 'text',
        autocomplete: 'off',
        style: { resize: (resizable.value === false) && 'none' },
        onFocus: async () => {
          isFocused.value = true
          textElementRef.value?.setSelectionRange(internalValue.value.length, internalValue.value.length)
        },
        onBlur: () => (isFocused.value = false),
        onInput: ev => onInput(ev, ev.target.value),
      },
    }))

    const onRenderLabel = () => {
      const labelStyles = classNames.value.subComponentStyles
        ? (classNames.value.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
        : undefined

      if (!label.value)
        return null

      return h(Label, {
        id: labelId,
        for: id,
        styles: labelStyles,
        disabled: disabled.value,
        required: required.value,
      }, {
        default: () => label.value,
      })
    }

    const onRenderDescription = () => {
      if (!description.value)
        return null
      return h('span', slotProps.value.description, description.value)
    }

    const $label = () => (slots.label ?? onRenderLabel)(props)

    const $fieldGroup = () => h('div', slotProps.value.fieldGroup, [
      h(Component.value, slotProps.value.field, internalValue.value),
    ])

    const $errorMessage = () => errorMessage.value && h('div', slotProps.value.description, [
      h('div', { role: 'alert' }, [
        h('p', { class: classNames.value.errorMessage }, [
          h('span', errorMessage.value),
        ]),
      ]),
    ])

    return () => h('div', slotProps.value.root, [
      h('div', slotProps.value.wrapper, [
        $label(),
        $fieldGroup(),
      ]),
      h('span', { id: descriptionId }, [
        (slots.description ?? onRenderDescription)(props),
        $errorMessage(),
      ]),
    ])
  },

})
