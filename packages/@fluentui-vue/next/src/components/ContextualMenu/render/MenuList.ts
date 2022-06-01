import { asSlotProps, useStylingProps } from '@/utils'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { ContextualMenuItemType, IContextualMenuListProps, IContextualMenuStyles } from '../ContextualMenu.types'
import { MenuItem } from './MenuItem'

export const MenuList = Vue.extend({
  functional: true,

  props: {
    ...useStylingProps(),
    menuListProps: {
      type: Object as () => IContextualMenuListProps,
      required: true,
    },
    menuClassNames: {
      type: Object as () => IProcessedStyleSet<IContextualMenuStyles>,
      required: true,
    },
  },

  render (h: CreateElement, ctx): VNode {
    const {
      theme,
      styles,
      menuListProps,
      menuClassNames,
    } = ctx.props

    const { items, totalItemCount, hasCheckmarks, hasIcons } = menuListProps

    const slotProps = asSlotProps({
      list: {
        class: menuClassNames.list,
        attrs: {
          role: 'presentation',
        },
      },
    })
    let indexCorrection = 0
    return h('ul', slotProps.list, items.map((item: any, index) => {
      const menuItem = h(MenuItem, {
        props: {
          theme,
          styles,
          item,
          index,
          indexCorrection,
          totalItemCount,
          hasCheckmarks,
          hasIcons,
          classNames: menuClassNames,
        },
      })
      if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
        const indexIncrease = item.customOnRenderListLength ? item.customOnRenderListLength : 1
        indexCorrection += indexIncrease
      }

      return menuItem
    }))
  },
})
