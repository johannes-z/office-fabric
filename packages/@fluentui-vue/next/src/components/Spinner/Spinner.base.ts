import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types'
import { asSlotProps } from '@/utils'

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>()

export const SpinnerBase = (props, { attrs, slots }) => {
  const { styles, className, size = 20, label, labelPosition = 'bottom' } = props

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
}

SpinnerBase.props = ['styles', 'theme', 'className', 'label', 'labelPosition', 'size']
