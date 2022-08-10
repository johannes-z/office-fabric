import { asSlotProps } from '@/utils'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { IContextualMenuClassNames, IMenuItemClassNames } from '../ContextualMenu.classNames'
import { IContextualMenuItem, IContextualMenuStyles } from '../ContextualMenu.types'
import { ContextualMenuItem } from '../ContextualMenuItem'

export const MenuHeaderMenuItem = Vue.extend({
  functional: true,

  props: {
    item: { type: Object as () => IContextualMenuItem, required: true },
    itemClassNames: {
      type: Object as () => IMenuItemClassNames,
      required: true,
    },
    menuClassNames: {
      type: Object as () => IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
      required: true,
    },
    index: { type: Number, required: true },
    hasCheckmarks: { type: Boolean, required: true },
    hasIcons: { type: Boolean, required: true },
  },

  render (h: CreateElement, ctx): VNode {
    const {
      item,
      itemClassNames,
      menuClassNames,
      index,
      hasCheckmarks,
      hasIcons,
    } = ctx.props

    const { itemProps, id } = item

    const slotProps = asSlotProps({
      root: {
        class: menuClassNames.header,
        style: item.style,
        attrs: {
          id: id,
        },
      },
      item: {
        props: {
          item,
          classNames: itemClassNames,
          index,
          hasIcons,
          ...itemProps,
        },
        on: {
          click (e) {
            // TODO hasCheckmarks
            // console.log(e)
          },
        },
      },
    })

    return h('div', slotProps.root, [
      h(ContextualMenuItem, slotProps.item),
    ])
  },
})
