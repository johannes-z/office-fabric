import { asSlotProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { IMenuItemClassNames } from '../ContextualMenu.classNames'

export const MenuListItem = Vue.extend({
  functional: true,

  props: {
    classNames: {
      type: Object as () => IMenuItemClassNames,
      required: true,
    },
    title: { type: String, default: undefined },
  },

  render (h: CreateElement, ctx): VNode {
    const {
      classNames,
      title,
    } = ctx.props

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        class: classNames.item,
        attrs: {
          title,
          role: 'presentation',
        },
      },
    })

    return h('li', slotProps.root, ctx.children)
  },
})
