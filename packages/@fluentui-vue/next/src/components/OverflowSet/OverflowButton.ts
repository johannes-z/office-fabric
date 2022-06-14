
import Vue, { VNode } from 'vue'
import { asSlotProps, useStylingProps } from '@/utils'
import type { IOverflowSetItemProps, IOverflowSetProps } from './OverflowSet.types'

export const OverflowButton = Vue.extend({
  name: 'OverflowButton',

  functional: true,

  props: {
    ...useStylingProps(),

    overflowItems: { type: Array as () => any[], default: () => [] },
  },

  render (h, ctx): VNode {
    const { className, overflowItems } = ctx.props

    const modifiedOverflowItems = overflowItems

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        class: className ?? ctx.data.class,
      },
    })

    return h('div', slotProps.root, ctx.scopedSlots.overflow?.(modifiedOverflowItems))
  },
})
