import { asSlotProps } from '@/utils'
import { IProcessedStyleSet } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { IContextualMenuClassNames, IMenuItemClassNames } from '../ContextualMenu.classNames'
import { ContextualMenuItemType, IContextualMenuItem, IContextualMenuStyles } from '../ContextualMenu.types'
import { MenuHeaderMenuItem } from './MenuHeaderMenuItem'
import { MenuItem } from './MenuItem'
import { MenuListItem } from './MenuListItem'
import { MenuSeparator } from './MenuSeparator'

export const MenuSectionItem = Vue.extend({
  functional: true,

  props: {
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
  },

  // @ts-ignore
  render (h: CreateElement, ctx): VNode | void {
    const {
      item,
      itemClassNames,
      menuClassNames,
      index,
      hasCheckmarks,
      hasIcons,
    } = ctx.props

    const menuId = 'Test'

    const sectionProps = item.sectionProps
    if (!sectionProps) return
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
          id: id,
        }
        ariaLabelledby = id
      } else {
        const id = sectionProps.title.id || menuId + sectionProps.title.key.replace(/\s/g, '')
        headerContextualMenuItem = { ...sectionProps.title, id }
        ariaLabelledby = id
      }

      if (headerContextualMenuItem) {
        groupProps = {
          role: 'group',
          'aria-labelledby': ariaLabelledby,
        }
        headerItem = h(MenuHeaderMenuItem, {
          props: {
            item: headerContextualMenuItem,
            itemClassNames,
            menuClassNames,
            index,
            hasCheckmarks,
            hasIcons,
          },
        })
      }
    }

    const slotProps = asSlotProps({
      list: {
        class: menuClassNames.list,
      },
      topDivider: {
        props: {
          index,
          classNames: itemClassNames,
          top: true,
          fromSection: true,
        },
      },
      headerItem: {
        key: item.key || index,
        props: {
          classNames: itemClassNames,
          title: item.title,
        },
      },
    })

    if (!sectionProps.items?.length) return

    return h('li', [
      h('div', groupProps, [
        h('ul', slotProps.list, [
          sectionProps.topDivider && h(MenuSeparator, slotProps.topDivider),
          headerItem && h(MenuListItem, slotProps.headerItem, [headerItem]),
          ...sectionProps.items.map((contextualMenuItem, itemsIndex) =>
            h(MenuItem, {
              props: {
                item: contextualMenuItem,
                classNames: menuClassNames,
                index: itemsIndex,
                focusableElementIndex: itemsIndex,
                totalItemCount: sectionProps.items.length,
                hasCheckmarks,
                hasIcons,
              },
            }),
          ),
        ]),
      ]),
    ])
  },
})
