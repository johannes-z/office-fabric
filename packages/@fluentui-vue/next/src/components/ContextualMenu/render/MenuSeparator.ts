import { asSlotProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { IMenuItemClassNames } from '../ContextualMenu.classNames'

export const MenuSeparator = Vue.extend({
  functional: true,

  props: {
    index: { type: Number, required: true },
    classNames: {
      type: Object as () => IMenuItemClassNames,
      required: true,
    },
    top: { type: Boolean, default: undefined },
    fromSection: { type: Boolean, default: undefined },
  },

  // @ts-ignore
  render (h: CreateElement, ctx): VNode | void {
    const {
      index,
      classNames,
      top,
      fromSection,
    } = ctx.props
    if (!fromSection && index <= 0) return

    const slotProps = asSlotProps({
      root: {
        key: 'separator-' + index + (top === undefined ? '' : top ? '-top' : '-bottom'),
        class: classNames.divider,
        attrs: {
          'aria-hidden': true,
          role: 'separator',
        },
      },
    })

    return h('li', slotProps.root)
  },
})
