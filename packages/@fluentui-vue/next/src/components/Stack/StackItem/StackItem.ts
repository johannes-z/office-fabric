import { asSlotProps, useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'
import Vue from 'vue'
import { StackItemStyles as baseStyles } from './StackItem.styles'

const getClassNames = classNamesFunction({
  disableCaching: true,
})

export const StackItem = Vue.extend({
  name: 'StackItem',

  functional: true,

  props: {
    ...useStylingProps(),

    grow: { type: [Number, Boolean], default: 0 },
    shrink: { type: [Boolean, Number, String], default: undefined },
    disableShrink: { type: Boolean, default: undefined },
    align: {
      type: String,
      validator: v => ['auto', 'stretch', 'baseline', 'start', 'center', 'end'].indexOf(v) > -1,
      default: undefined,
    },
    verticalFill: { type: Boolean, default: undefined },
    basis: { type: String, default: 'auto' },
    order: { type: [Number, String], default: null },
  },

  render (h, ctx) {
    const { theme, className, styles, grow, shrink, disableShrink, align, verticalFill, order, basis } = ctx.props

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
        ...ctx.data,
        class: classNames.root,
      },
    })

    return h('div', slotProps.root, ctx.children)
  },
})
