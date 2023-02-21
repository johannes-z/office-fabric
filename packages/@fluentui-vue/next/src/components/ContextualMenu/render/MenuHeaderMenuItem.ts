import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode, h } from 'vue'
import { IContextualMenuClassNames, IMenuItemClassNames } from '../ContextualMenu.classNames'
import { IContextualMenuItem, IContextualMenuStyles } from '../ContextualMenu.types'
import { ContextualMenuItem } from '../ContextualMenuItem'
import { asSlotProps } from '@/utils'

export const MenuHeaderMenuItem = (props, { attrs, slots }) => {
  const {
    item,
    itemClassNames,
    menuClassNames,
    index,
    hasCheckmarks,
    hasIcons,
  } = props

  const { itemProps, id } = item

  const slotProps = asSlotProps({
    root: {
      class: menuClassNames.header,
      style: item.style,
      id,
    },
    item: {
      item,
      classNames: itemClassNames,
      index,
      hasIcons,
      ...itemProps,
      onClick(e) {
        // TODO hasCheckmarks
        // console.log(e)
      },
    },
  })

  return h('div', slotProps.root, [
    h(ContextualMenuItem, slotProps.item),
  ])
}

MenuHeaderMenuItem.props = [
  'item',
  'itemClassNames',
  'menuClassNames',
  'index',
  'hasCheckmarks',
  'hasIcons',
]
