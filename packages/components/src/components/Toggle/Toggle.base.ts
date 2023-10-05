import { classNamesFunction, getId } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, toRefs, watch } from 'vue'
import { Label } from '../Label'
import type { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types'
import { makeStylingProps, propsFactoryFromInterface } from '@/utils'
import { useProxiedModel } from '@/composables'

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>()

export const makeToggleProps = propsFactoryFromInterface<IToggleProps>()({
  ...makeStylingProps(),

  disabled: { type: Boolean, default: false },

  label: { type: String, default: '' },
  inlineLabel: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },
  checked: { type: Boolean, default: false },
  onText: { type: String, default: null },
  offText: { type: String, default: null },
  as: { type: String, default: '' },

  onChange: { type: Function, default: undefined },
  'onUpdate:modelValue': { type: Function, default: undefined },
}, 'Toggle')

export const ToggleBase = defineComponent({
  name: 'ToggleBase',

  props: makeToggleProps(),

  emits: [
    'change',
    'update:modelValue',
    'update:checked',
  ],

  setup(props, { slots }) {
    const {
      label,
      onText,
      offText,
      styles,
      theme,
      className,
      disabled,
      inlineLabel,
    } = toRefs(props)

    const modelValue = useProxiedModel(props, 'modelValue')
    const checked = useProxiedModel(props, 'checked', modelValue.value)

    const id = getId('Toggle')
    const onOffMissing = computed(() => !onText.value && !offText.value)
    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value!,
      className: className.value,
      disabled: disabled.value,
      checked: checked.value,
      inlineLabel: inlineLabel.value,
      onOffMissing: onOffMissing.value,
    }))

    const slotProps = computed(() => ({
      root: {
        class: classNames.value.root,
      },
      label: {
        class: classNames.value.label,
        for: id,
      },
      container: {
        class: classNames.value.container,
      },
      pill: {
        class: classNames.value.pill,
        id,
        onClick: (ev: PointerEvent) => {
          if (disabled.value)
            return
          checked.value = !checked.value
          props.onChange?.(ev, checked.value)
        },
      },
      thumb: {
        class: classNames.value.thumb,
      },
      text: {
        class: classNames.value.text,
        for: id,
      },
    }))

    const showLabel = computed(() => (checked.value && onText.value) || (!checked.value && offText.value))
    return () => h('div', slotProps.value.root, [
      h(Label, slotProps.value.label, {
        default: () => slots.label?.({
          checked: checked.value,
          disabled: disabled.value,
          label: label.value,
        }) ?? label.value,
      }),
      h('div', slotProps.value.container, [
        h('button', slotProps.value.pill, [
          h('div', slotProps.value.thumb),
        ]),
        showLabel.value && h(Label, slotProps.value.text, {
          default: () => checked.value ? onText.value : offText.value,
        }),
      ]),
    ])
  },
})
