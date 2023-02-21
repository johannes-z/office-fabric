import { classNamesFunction } from '@fluentui-vue/utilities'
import { defineComponent, h, toRefs } from 'vue'
import type { ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types'
import { asSlotProps, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>()

export const SpinnerBase = defineComponent({

  props: {
    ...useStylingProps(),

    label: { type: String, default: null },
    labelPosition: {
      type: String as () => ISpinnerStyleProps['labelPosition'],
      default: 'bottom' as const,
    },
    size: { type: [Number, String], default: 20 },
  },

  setup(props, { attrs, slots }) {
    const { styles, className, size, label, labelPosition } = toRefs(props)

    const classNames = getClassNames(styles.value, {
      className: className.value,
      labelPosition: labelPosition.value,
      size: isNaN(+size.value) ? 20 : Number(size.value),
    })

    const slotProps = asSlotProps<ISpinnerStyles>({
      root: {
        ...attrs,
        class: classNames.root,
      },
      circle: {
        class: classNames.circle,
      },
      label: {
        class: classNames.label,
      },
    })

    return () => h('div', slotProps.root, [
      h('div', slotProps.circle),
      h('div', slotProps.label, slots.default ? slots : label.value),
    ])
  },
})
