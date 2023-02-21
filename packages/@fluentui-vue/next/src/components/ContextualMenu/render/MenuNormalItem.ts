import { h } from 'vue'
import { ContextualMenuItem } from '../ContextualMenuItem'
import { ContextualMenuAnchor, ContextualMenuButton } from '../ContextualMenuItemWrapper'

export const MenuNormalItem = (props, { attrs, slots }) => {
  const {
    item,
    classNames,
    index,
    focusableElementIndex,
    totalItemCount,
    hasCheckmarks,
    hasIcons,
  } = props
  // if (item.onRender) {
  //   return item.onRender(
  //     { 'aria-posinset': focusableElementIndex + 1, 'aria-setsize': totalItemCount, ...item },
  //     dismiss,
  //   );
  // }

  const commonProps = {
    item,
    classNames,
    index,
    focusableElementIndex,
    totalItemCount,
    hasCheckmarks,
    hasIcons,
    contextualMenuItemAs: ContextualMenuItem,
    onItemMouseEnter: () => {}, // onItemMouseEnterBase,
    onItemMouseLeave: () => {}, // onMouseItemLeave,
    onItemMouseMove: () => {}, // onItemMouseMoveBase,
    onItemMouseDown: () => {}, // onItemMouseDown,
    executeItemClick: () => {}, // executeItemClick,
    onItemKeyDown: () => {}, // onItemKeyDown,
    expandedMenuItemKey: false,
    openSubMenu: false,
    dismissSubMenu: () => {}, // onSubMenuDismiss,
    dismissMenu: () => {}, // dismiss,
  }

  if (item.href)
    return h(ContextualMenuAnchor, commonProps)
    // return <ContextualMenuAnchor {...commonProps} onItemClick={onAnchorClick} />;

  // if (item.split && hasSubmenu(item)) {
  //   return (
  //     <ContextualMenuSplitButton
  //       {...commonProps}
  //       onItemClick={onItemClick}
  //       onItemClickBase={onItemClickBase}
  //       onTap={cancelSubMenuTimer}
  //     />
  //   );
  // }
  return h(ContextualMenuButton, {
    ...attrs,
    ...props,
    ...commonProps,
  })

  // return <ContextualMenuButton {...commonProps} onItemClick={onItemClick} onItemClickBase={onItemClickBase} />;
}
MenuNormalItem.props = [
  'item',
  'classNames',
  'index',
  'focusableElementIndex',
  'totalItemCount',
  'hasCheckmarks',
  'hasIcons',
]
