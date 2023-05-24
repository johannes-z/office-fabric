import { classNamesFunction, getId } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, ref, toRefs, watch } from 'vue'
import { Label } from '../Label'
import type { IToggleStyleProps, IToggleStyles } from './Toggle.types'
import { useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>()

export const ToggleBase = defineComponent({
  name: 'ToggleBase',

  props: {
    ...useStylingProps(),

    disabled: { type: Boolean, default: false },

    label: { type: String, default: '' },
    inlineLabel: { type: Boolean, default: false },
    modelValue: { type: Boolean, default: false },
    defaultChecked: { type: Boolean, default: false },
    onText: { type: String, default: null },
    offText: { type: String, default: null },
  },

  setup(props, { emit, slots }) {
    const {
      label,
      modelValue,
      defaultChecked,
      onText,
      offText,
      styles,
      theme,
      className,
      disabled,
      inlineLabel,
    } = toRefs(props)

    const checked = ref(defaultChecked.value || modelValue.value)

    watch(modelValue, (value) => {
      checked.value = value
    })

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
        onClick: () => {
          if (disabled.value)
            return
          checked.value = !checked.value
          emit('update:modelValue', checked.value)
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
        default: () => slots.label?.({ checked: checked.value, disabled: disabled.value, label: label.value }) ?? label.value,
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
