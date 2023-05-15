import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode, h } from 'vue'
import type { IContextualMenuListProps, IContextualMenuStyles } from '../ContextualMenu.types'
import { ContextualMenuItemType } from '../ContextualMenu.types'
import { MenuItem } from './MenuItem'
import { asSlotProps, useStylingProps } from '@/utils'

export function MenuList(props, { attrs }) {
  const {
    theme,
    styles,
    menuListProps,
    menuClassNames,
  } = props

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
  return h('ul', slotProps.list, {
    default: () => items.map((item: any, index) => {
      const menuItem = h(MenuItem, {
        ...attrs,
        theme,
        styles,
        item,
        index,
        indexCorrection,
        totalItemCount,
        hasCheckmarks,
        hasIcons,
        classNames: menuClassNames,
        onClick: (ev: PointerEvent) => {
          attrs.onClick(ev, item)
        },
      })
      if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
        const indexIncrease = item.customOnRenderListLength ? item.customOnRenderListLength : 1
        indexCorrection += indexIncrease
      }

      return menuItem
    }),
  })
}
MenuList.inheritAttrs = false
MenuList.props = Object.keys({
  ...useStylingProps(),
  menuListProps: {
    type: Object as () => IContextualMenuListProps,
    required: true,
  },
  menuClassNames: {
    type: Object as () => IProcessedStyleSet<IContextualMenuStyles>,
    required: true,
  },
})
