import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { Icon } from '../Icon'
import { IMenuItemClassNames } from './ContextualMenu.classNames'
import { IContextualMenuItem } from './ContextualMenu.types'

export const ContextualMenuItemBase = Vue.extend({
  name: 'ContextualMenuItemBase',

  functional: true,

  props: {
    ...useStylingProps(),

    item: { type: Object as () => IContextualMenuItem, required: true },
    hasIcons: { type: Boolean, default: undefined },
    classNames: { type: Object as () => IMenuItemClassNames, required: true },
  },

  render (h: CreateElement, ctx): VNode {
    const {
      classNames,
      item,
      hasIcons,
    } = ctx.props
    const iconProps = item.iconProps

    const slotProps = asSlotProps({
      linkContent: {
        ...ctx.data,
        class: classNames.linkContent,
        on: {
          ...item.onClick
            ? { click: item.onClick }
            : {},
        },
      },
      icon: {
        class: classNames.icon,
        props: iconProps,
      },
      text: {
        class: classNames.label,
      },
      secondaryText: {
        class: classNames.secondaryText,
      },
    })

    return h('div', slotProps.linkContent, [
      hasIcons && (ctx.scopedSlots.icon?.(ctx.props) || h(Icon, slotProps.icon)),
      ctx.scopedSlots.text?.({ item, classNames }) || h('span', slotProps.text, item.text || item.name),
      ctx.scopedSlots.secondaryText?.({ item, classNames }) || h('span', slotProps.secondaryText, item.secondaryText),
    ])
  },
})
