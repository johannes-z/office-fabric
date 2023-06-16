import { classNamesFunction, getId } from '@fluentui-vue/utilities'
import type { PropType } from 'vue'
import { computed, defineComponent, getCurrentInstance, h, ref, toRefs, watch } from 'vue'
import { Icon } from '../Icon'
import { Label } from '../Label'
import type { ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types'
import { useStylingProps } from '@/utils/'
import type { SlotProps } from '@/utils/'
import { useProxiedModel } from '@/composables'

export type CheckboxLabelPosition = 'top' | 'right' | 'bottom' | 'left'

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>()

export const CheckboxBase = defineComponent({
  name: 'CheckboxBase',

  emits: [
    'change',
    'update:modelValue',
    'update:indeterminate',
  ],

  props: {
    ...useStylingProps<ICheckboxStyleProps, ICheckboxStyles>(),

    modelValue: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: null },
    title: { type: String, default: null },
    boxSide: {
      type: String as PropType<'start' | 'end'>,
      default: 'start',
      validator: (v: string) => ['start', 'end'].includes(v),
    },
    inputProps: { type: Object as () => any, default: undefined },

    checkmarkIconProps: { type: Object as () => any, default: undefined },
  },

  setup(props, { attrs, slots, emit, expose }) {
    const {
      theme,
      styles,
      className,
      disabled,
      boxSide,
      checkmarkIconProps,
      title,
      inputProps,
      label,
    } = toRefs(props)

    const id = computed(() => getId('Checkbox'))

    const modelValue = useProxiedModel(props, 'modelValue')
    const indeterminate = useProxiedModel(props, 'indeterminate')

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      disabled: disabled.value,
      indeterminate: indeterminate.value,
      checked: indeterminate.value ? false : modelValue.value,
      reversed: boxSide.value !== 'start',
      isUsingCustomLabelRender: true,
    }))

    const onInput = () => {
      if (disabled.value)
        return

      if (indeterminate.value)
        indeterminate.value = false
      else
        modelValue.value = !modelValue.value
    }

    const inputRef = ref<HTMLInputElement | null>(null)

    expose({
      focus: () => {
        inputRef.value?.focus()
      },
      checked: computed(() => modelValue.value),
      indeterminate: computed(() => indeterminate.value),
    })

    const slotProps = computed<SlotProps<ICheckboxStyles>>(() => ({
      root: {
        class: classNames.value.root,
      },
      input: {
        ...attrs,
        class: classNames.value.input,
        id: id.value,
        ...inputProps.value,
        disabled: disabled.value,
        type: 'checkbox',
        ref: inputRef,
        onInput,
      },
      label: {
        class: classNames.value.label,
        for: id.value,
      },
      checkbox: {
        class: classNames.value.checkbox,
      },
      checkmark: {
        className: classNames.value.checkmark,
        iconName: 'CheckMark',
        ...checkmarkIconProps.value,
      },
      text: {
        class: classNames.value.text,
        title: title.value,
      },
    }))

    return () => h('div', slotProps.value.root, [
      h('input', slotProps.value.input),

      h(Label, slotProps.value.label, () => [
        h('div', slotProps.value.checkbox, [
          h(Icon, slotProps.value.checkmark),
        ]),
        (slots.default || label.value) && h('span', slotProps.value.text, slots.default ? slots : label.value),
      ]),
    ])
  },
})
