import { getId, classNamesFunction } from '@fluentui-vue/utilities'
import { asSlotProps, useStylingProps } from '@/utils'
import { IProcessedStyleSet, IStyleFunctionOrObject } from '@fluentui/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { Callout } from '../Callout'
import { ICalloutContentStyleProps, ICalloutContentStyles } from '../Callout/Callout.types'
import { ContextualMenuItemType, DirectionalHint, IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types'
import { MenuList } from './render/MenuList'

const getClassNames = classNamesFunction<IContextualMenuStyleProps, IContextualMenuStyles>()

export const ContextualMenuBase = Vue.extend({
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
    classNames (): IProcessedStyleSet<IContextualMenuStyles> {
      const { styles, theme, className } = this

      return getClassNames(styles, {
        theme: theme!,
        className: className,
      })
    },
    totalItemCount (): number {
      let totalItemCount = 0
      for (const item of this.items) {
        if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
          const itemCount = item.customOnRenderListLength ? item.customOnRenderListLength : 1
          totalItemCount += itemCount
        }
      }
      return totalItemCount
    },
    hasCheckmarks (): boolean {
      return this.items.some(item => {
        if (item.canCheck) return true
        return false
      })
    },
    hasIcons (): boolean {
      return this.items.some(item => {
        if (item.iconProps) return true
        return false
      })
    },
  },

  render (h: CreateElement, ctx): VNode | any {
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

    if (!items || items.length === 0) return

    const calloutStyles = classNames.subComponentStyles
      ? (classNames.subComponentStyles.callout as IStyleFunctionOrObject<
      ICalloutContentStyleProps,
      ICalloutContentStyles
      >)
      : undefined

    const slotProps = asSlotProps({
      root: {
        // class: classNames.root,
        props: {
          classNames: classNames.root,
          styles: calloutStyles,
          target,
          hidden,
          isBeakVisible: isBeakVisible === true,
          gapSpace: 0,
          beakWidth: 16,
          directionalHint: this.directionalHint,
        },
        on: {
          dismiss: () => this.$emit('dismiss'),
        },
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

    if (hidden) return

    return h(Callout, slotProps.root, [
      h('div', slotProps.container, [
        title && h('div', slotProps.title, title),
        items && h(MenuList, {
          props: {
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
          },
        }),
      ]),
    ])
  },
})
