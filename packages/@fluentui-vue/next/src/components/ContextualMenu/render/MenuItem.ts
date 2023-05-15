import { classNamesFunction, memoizeFunction } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet, IStyleFunctionOrObject } from '@fluentui/merge-styles'
import { concatStyleSetsWithProps } from '@fluentui/merge-styles'
import { h } from 'vue'
import type { IContextualMenuClassNames } from '../ContextualMenu.classNames'
import { getItemStyles } from '../ContextualMenu.classNames'
import type { IContextualMenuItem, IContextualMenuStyles } from '../ContextualMenu.types'
import { ContextualMenuItemType } from '../ContextualMenu.types'
import type { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from '../ContextualMenuItem.types'
import { MenuListItem } from './MenuListItem'
import { MenuNormalItem } from './MenuNormalItem'
import { MenuSectionItem } from './MenuSectionItem'
import { MenuSeparator } from './MenuSeparator'
import { useStylingProps } from '@/utils'

const getContextualMenuItemClassNames = classNamesFunction<IContextualMenuItemStyleProps, IContextualMenuItemStyles>()

const _getMenuItemStylesFunction = memoizeFunction(
  (
    ...styles: (IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles> | undefined)[]
  ): IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles> => {
    return (styleProps: IContextualMenuItemStyleProps) =>
      concatStyleSetsWithProps(styleProps, getItemStyles, ...styles)
  },
)

export function getIsChecked(item: IContextualMenuItem): boolean | null {
  if (item.canCheck)
    return !!(item.isChecked || item.checked)

  if (typeof item.isChecked === 'boolean')
    return item.isChecked

  if (typeof item.checked === 'boolean')
    return item.checked

  // Item is not checkable.
  return null
}

export function hasSubmenu(item: IContextualMenuItem): boolean {
  return !!(item.subMenuProps || item.items)
}

export function isItemDisabled(item: IContextualMenuItem): boolean {
  return !!(item.isDisabled || item.disabled)
}

export function MenuItem(props, { attrs, slots }) {
  const {
    theme,
    styles,

    item,
    classNames,
    index,
    focusableElementIndex,
    totalItemCount,
    hasCheckmarks,
    hasIcons,

    expandedMenuItemKey,
  } = props

  const iconProps = item.iconProps || { iconName: 'None' }
  const dividerClassName = item.itemType === ContextualMenuItemType.Divider ? item.className : undefined
  const subMenuIconClassName = item.submenuIconProps ? item.submenuIconProps.className : ''

  const itemStyleProps: IContextualMenuItemStyleProps = {
    theme: theme!,
    disabled: isItemDisabled(item),
    expanded: expandedMenuItemKey === item.key,
    checked: !!getIsChecked(item),
    isAnchorLink: !!item.href,
    knownIcon: iconProps.iconName !== 'None',
    itemClassName: item.className,
    dividerClassName,
    iconClassName: iconProps.className,
    subMenuClassName: subMenuIconClassName,
    primaryDisabled: item.primaryDisabled,
  }

  const itemClassNames = getContextualMenuItemClassNames(
    _getMenuItemStylesFunction(classNames.subComponentStyles?.menuItem, styles),
    itemStyleProps,
  )

  if (item.text === '-' || item.name === '-')
    item.itemType = ContextualMenuItemType.Divider

  switch (item.itemType) {
    case ContextualMenuItemType.Divider:
      return h(MenuSeparator, { index, classNames: itemClassNames })
    case ContextualMenuItemType.Header:
      return [
        h(MenuSeparator, { index, classNames: itemClassNames }),
      ]
    case ContextualMenuItemType.Section:
      return [
        h(MenuSectionItem, {
          ...attrs,
          item,
          itemClassNames,
          menuClassNames: classNames,
          index,
          hasCheckmarks,
          hasIcons,
        }),
      ]
    default: {
      return h(MenuListItem, {
        ...attrs,
        key: item.key || index,
        classNames: itemClassNames,
        title: item.title,
      }, {
        default: () => h(MenuNormalItem, {
          item,
          classNames: itemClassNames,
          index,
          focusableElementIndex,
          totalItemCount,
          hasCheckmarks,
          hasIcons,
        }),
      })
    }
  }
}
MenuItem.props = Object.keys({
  ...useStylingProps(),

  item: {
    type: Object as () => IContextualMenuItem,
    default: undefined,
  },
  classNames: {
    type: Object as () => IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
    default: undefined,
  },
  index: { type: Number, default: undefined },
  focusableElementIndex: { type: Number, default: undefined },
  totalItemCount: { type: Number, default: undefined },
  hasCheckmarks: { type: Boolean, default: undefined },
  hasIcons: { type: Boolean, default: undefined },

  expandedMenuItemKey: { type: String, default: undefined },
})
