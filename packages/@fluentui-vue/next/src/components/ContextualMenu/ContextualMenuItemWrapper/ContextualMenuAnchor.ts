import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { VNode } from 'vue'
import { IMenuItemClassNames } from '../ContextualMenu.classNames'
import { IContextualMenuItem } from '../ContextualMenu.types'
import { ContextualMenuItem } from '../ContextualMenuItem'

export const ContextualMenuAnchor = Vue.extend({
  functional: true,

  props: {
    ...useStylingProps(),

    item: { type: Object as () => IContextualMenuItem, required: true },
    hasIcons: { type: Boolean, default: undefined },
    classNames: { type: Object as () => IMenuItemClassNames, required: true },
  },

  render (h, ctx): VNode {
    const {
      item,
      classNames,
    } = ctx.props

    const slotProps = asSlotProps({
      root: {
        class: classNames.root,
        attrs: {
          href: item.href,
          target: item.target,
        },
      },
      item: {
        props: ctx.props,
      },
    })

    return h('a', slotProps.root, [
      h(ContextualMenuItem, slotProps.item),
    ])
  },
})
