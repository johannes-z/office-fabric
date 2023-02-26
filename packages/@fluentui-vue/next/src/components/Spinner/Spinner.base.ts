import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ISpinnerProps, ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>()

export const SpinnerBase = defineFunctionalComponent({
  ...useStylingProps(),

  label: { type: String, default: null },
  labelPosition: {
    type: String as () => ISpinnerStyleProps['labelPosition'],
    default: 'bottom' as const,
  },
  size: { type: [Number, String], default: 20 },
}, (props: ISpinnerProps, { attrs, slots }) => {
  const { styles, className, size = 20, label, labelPosition } = props

  const classNames = getClassNames(styles, {
    className,
    labelPosition,
    size: Number(size),
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

  return h('div', slotProps.root, [
    h('div', slotProps.circle),
    h('div', slotProps.label, slots.default ? slots : label),
  ])
})
