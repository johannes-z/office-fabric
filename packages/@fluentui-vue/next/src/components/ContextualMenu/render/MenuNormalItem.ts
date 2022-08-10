import Vue, { CreateElement, VNode } from 'vue'
import { IMenuItemClassNames } from '../ContextualMenu.classNames'
import { IContextualMenuItem } from '../ContextualMenu.types'
import { ContextualMenuItem } from '../ContextualMenuItem'
import { ContextualMenuAnchor, ContextualMenuButton } from '../ContextualMenuItemWrapper'

export const MenuNormalItem = Vue.extend({
  functional: true,

  props: {
    item: { type: Object as () => IContextualMenuItem, required: true },
    classNames: { type: Object as () => IMenuItemClassNames, required: true },
    index: { type: Number, default: undefined },
    focusableElementIndex: { type: Number, default: undefined },
    totalItemCount: { type: Number, default: undefined },
    hasCheckmarks: { type: Boolean, default: undefined },
    hasIcons: { type: Boolean, default: undefined },
  },

  render (h: CreateElement, ctx): VNode {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
    } = ctx.props
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

    if (item.href) {
      return h(ContextualMenuAnchor, { props: commonProps })
      // return <ContextualMenuAnchor {...commonProps} onItemClick={onAnchorClick} />;
    }

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
      ...ctx.data,
      props: commonProps,
    })

    // return <ContextualMenuButton {...commonProps} onItemClick={onItemClick} onItemClickBase={onItemClickBase} />;
  },
})
