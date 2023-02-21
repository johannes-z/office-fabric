import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { h } from 'vue'
import { getTheme } from '@fluentui-vue/style-utilities'
import { StackItemStyles as baseStyles } from './StackItem.styles'
import { asSlotProps, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction({
  disableCaching: true,
})

export const StackItem = (props, { attrs, slots }) => {
  const { theme = getTheme(), className, styles, grow, shrink, disableShrink, align, verticalFill, order, basis } = props

  const classNames: any = getClassNames(mergeStyleSets(baseStyles({
    grow,
    shrink,
    disableShrink,
    align,
    verticalFill,
    order,
    className,
    basis,
  }, theme, {}), styles))

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      class: classNames.root,
    },
  })

  return h('div', slotProps.root, slots)
}

StackItem.props = Object.keys({
  ...useStylingProps(),

  grow: { type: [Number, Boolean], default: 0 },
  shrink: { type: [Boolean, Number, String], default: undefined },
  disableShrink: { type: Boolean, default: undefined },
  align: {
    type: String,
    validator: v => ['auto', 'stretch', 'baseline', 'start', 'center', 'end'].includes(v),
    default: undefined,
  },
  verticalFill: { type: Boolean, default: undefined },
  basis: { type: String, default: 'auto' },
  order: { type: [Number, String], default: null },
})
