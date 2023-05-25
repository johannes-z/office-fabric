import type { IProcessedStyleSet } from '@fluentui/merge-styles'
import { h } from 'vue'
import type { IContextualMenuClassNames, IMenuItemClassNames } from '../ContextualMenu.classNames'
import type { IContextualMenuItem, IContextualMenuStyles } from '../ContextualMenu.types'
import { ContextualMenuItemType } from '../ContextualMenu.types'
import { MenuHeaderMenuItem } from './MenuHeaderMenuItem'
import { MenuItem } from './MenuItem'
import { MenuListItem } from './MenuListItem'
import { MenuSeparator } from './MenuSeparator'
import { asSlotProps } from '@/utils'

export function MenuSectionItem(props, { attrs, slots }) {
  const {
    item,
    itemClassNames,
    menuClassNames,
    index,
    hasCheckmarks,
    hasIcons,
  } = props

  const menuId = 'Test'

  const sectionProps = item.sectionProps
  if (!sectionProps)
    return
  let headerItem
  let groupProps

  if (sectionProps.title) {
    let headerContextualMenuItem: IContextualMenuItem | undefined
    let ariaLabelledby = ''
    if (typeof sectionProps.title === 'string') {
    // Since title is a user-facing string, it needs to be stripped
    // of whitespace in order to build a valid element ID
      const id = menuId + sectionProps.title.replace(/\s/g, '')
      headerContextualMenuItem = {
        key: `section-${sectionProps.title}-title`,
        itemType: ContextualMenuItemType.Header,
        text: sectionProps.title,
        id,
      }
      ariaLabelledby = id
    }
    else {
      const id = sectionProps.title.id || menuId + sectionProps.title.key.replace(/\s/g, '')
      headerContextualMenuItem = { ...sectionProps.title, id }
      ariaLabelledby = id
    }

    if (headerContextualMenuItem) {
      groupProps = {
        'role': 'group',
        'aria-labelledby': ariaLabelledby,
      }
      headerItem = h(MenuHeaderMenuItem, {
        item: headerContextualMenuItem,
        itemClassNames,
        menuClassNames,
        index,
        hasCheckmarks,
        hasIcons,
      })
    }
  }

  const slotProps = asSlotProps({
    list: {
      class: menuClassNames.list,
    },
    topDivider: {
      index,
      classNames: itemClassNames,
      top: true,
      fromSection: true,
    },
    headerItem: {
      key: item.key || index,
      classNames: itemClassNames,
      title: item.title,
    },
  })

  if (!sectionProps.items?.length)
    return

  return h('li', [
    h('div', groupProps, [
      h('ul', slotProps.list, [
        sectionProps.topDivider && h(MenuSeparator, slotProps.topDivider),
        headerItem && h(MenuListItem, slotProps.headerItem, [headerItem]),
        ...sectionProps.items.map((contextualMenuItem, itemsIndex) =>
          h(MenuItem, {
            ...attrs,
            item: contextualMenuItem,
            classNames: menuClassNames,
            index: itemsIndex,
            focusableElementIndex: itemsIndex,
            totalItemCount: sectionProps.items.length,
            hasCheckmarks,
            hasIcons,
          }),
        ),
      ]),
    ]),
  ])
}

MenuSectionItem.props = Object.keys({
  item: { type: Object, required: true },
  itemClassNames: {
    type: Object as () => IMenuItemClassNames,
    required: true,
  },
  menuClassNames: {
    type: Object as () => IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
    required: true,
  },
  index: { type: Number, default: 0 },
  hasCheckmarks: { type: Boolean, default: undefined },
  hasIcons: { type: Boolean, default: undefined },
})
