import { useStylingProps, asSlotProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { VNode } from 'vue'
import { OverflowButton } from './OverflowButton'
import { IOverflowSetStyleProps, IOverflowSetStyles } from './OverflowSet.types'

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>()

export const OverflowSetBase = Vue.extend({
  name: 'OverflowSetBase',

  functional: true,

  props: {
    ...useStylingProps(),

    vertical: { type: Boolean, default: false },
    overflowSide: { type: String, default: 'end', validator: e => ['start', 'end'].indexOf(e) > -1 },
    role: { type: String, default: 'group' },

    items: { type: Array as () => any[], default: () => [] },
    overflowItems: { type: Array as () => any[], default: () => [] },
  },

  render (h, ctx): VNode {
    const { styles, className, vertical } = ctx.props
    const { items, overflowItems, overflowSide, role } = ctx.props
    const classNames = getClassNames(styles, {
      className,
      vertical,
    })

    const slotProps = asSlotProps({
      root: {
        ref: ctx.data.ref,
        class: classNames.root,
        attrs: {
          role: role || 'group',
          'aria-orientation': role === 'menubar' ? (vertical === true ? 'vertical' : 'horizontal') : undefined,
        },
      },
      item: {
        ref: ctx.data.ref ? `${ctx.data.ref}Items` : undefined,
        refInFor: true,
        class: classNames.item,
        attrs: {
          role: 'none',
        },
      },
      overflowButton: {
        ...ctx.data,
        ref: undefined,
        class: classNames.overflowButton,
      },
    })

    const showOverflow = !!overflowItems && overflowItems.length > 0

    return h('div', slotProps.root, [
      // overflowbutton
      overflowSide === 'start' && showOverflow && h(OverflowButton, slotProps.overflowButton),
      items && items.map((item, index) => h('div', {
        ...slotProps.item,
        on: {
          ...item.onClick
            ? { click: item.onClick }
            : {},
        },
      }, ctx.scopedSlots.item?.({ item, index }))),
      overflowSide === 'end' && showOverflow && h(OverflowButton, slotProps.overflowButton),
      // overflowbutton
    ])
  },
})
