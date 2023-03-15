import { classNamesFunction, getId } from '@fluentui-vue/utilities'
import type { IProcessedStyleSet, IStyleFunctionOrObject } from '@fluentui/merge-styles'
import type { VNode } from 'vue'
import Vue, { CreateElement, defineComponent, h } from 'vue'
import { Callout } from '../Callout'
import type { ICalloutContentStyleProps, ICalloutContentStyles } from '../Callout/Callout.types'
import type { IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types'
import { ContextualMenuItemType, DirectionalHint } from './ContextualMenu.types'
import { MenuList } from './render/MenuList'
import { asSlotProps, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IContextualMenuStyleProps, IContextualMenuStyles>()

export const ContextualMenuBase = defineComponent({
  name: 'ContextualMenuBase',

  props: {
    ...useStylingProps(),

    ariaLabel: { type: String, default: undefined },

    target: { type: [HTMLElement, Object], required: true },
    title: { type: String, default: undefined },
    items: { type: Array as () => any[], default: undefined },
    hidden: { type: Boolean, default: undefined },
    isBeakVisible: { type: Boolean, default: undefined },

    directionalHint: { type: Number as () => DirectionalHint, default: DirectionalHint.bottomAutoEdge },
  },

  computed: {
    classNames(): IProcessedStyleSet<IContextualMenuStyles> {
      const { styles, theme, className } = this

      return getClassNames(styles, {
        theme: theme!,
        className,
      })
    },
    totalItemCount(): number {
      let totalItemCount = 0
      for (const item of this.items) {
        if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
          const itemCount = item.customOnRenderListLength ? item.customOnRenderListLength : 1
          totalItemCount += itemCount
        }
      }
      return totalItemCount
    },
    hasCheckmarks(): boolean {
      return this.items.some((item) => {
        if (item.canCheck)
          return true
        return false
      })
    },
    hasIcons(): boolean {
      return this.items.some((item) => {
        if (item.iconProps)
          return true
        return false
      })
    },
  },

  render(): VNode | any {
    const {
      styles,
      classNames,
      theme,
      ariaLabel,
      hidden,
      items,
      target,
      title,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      isBeakVisible,
    } = this

    const menuId = getId('ContextualMenu')

    if (!items || items.length === 0)
      return

    const calloutStyles = classNames.subComponentStyles
      ? (classNames.subComponentStyles.callout as IStyleFunctionOrObject<
      ICalloutContentStyleProps,
      ICalloutContentStyles
      >)
      : undefined

    const slotProps = asSlotProps({
      root: {
        // class: classNames.root,
        classNames: classNames.root,
        styles: calloutStyles,
        target,
        hidden,
        isBeakVisible: isBeakVisible === true,
        gapSpace: 0,
        beakWidth: 16,
        directionalHint: this.directionalHint,
        onDismiss: () => this.$emit('dismiss'),
      },
      container: {
        class: classNames.container,
      },
      title: {
        class: classNames.title,
      },
      list: {
        class: classNames.list,
      },
    })

    if (hidden)
      return

    return h(Callout, slotProps.root, {
      default: () =>
        h('div', slotProps.container, [
          title && h('div', slotProps.title, title),
          items && h(MenuList, {
            theme,
            styles,
            menuListProps: {
              ariaLabel,
              items,
              totalItemCount,
              hasCheckmarks,
              hasIcons,
              defaultMenuItemRenderer: null,
            },
            menuClassNames: classNames,
            onClick: (ev: PointerEvent, item) => {
              if (item?.disabled)
                return

              this.$emit('itemClick', ev)

              let shouldDismiss = false
              if (item?.onClick)
                shouldDismiss = !!item.onClick(ev, item)

              if (shouldDismiss || !ev.defaultPrevented)
                this.$emit('dismiss')
            },
          }),
        ]),

    })
  },
})
