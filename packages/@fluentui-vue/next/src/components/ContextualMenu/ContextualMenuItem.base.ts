import { h } from 'vue'
import { Icon } from '../Icon'
import type { IContextualMenuItem } from './ContextualMenu.types'
import type { IMenuItemClassNames } from './ContextualMenu.classNames'
import { StylingPropKeys, asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const ContextualMenuItemBase = defineFunctionalComponent({
  name: 'ContextualMenuItemBase',

  props: {
    ...useStylingProps(),

    item: { type: Object as () => IContextualMenuItem, required: true },
    hasIcons: { type: Boolean, default: undefined },
    classNames: { type: Object as () => IMenuItemClassNames, required: true },
  },

  render(props, { attrs, slots }) {
    const {
      classNames,
      item,
      hasIcons,
    } = props
    const iconProps = item.iconProps

    const slotProps = asSlotProps({
      linkContent: {
        ...attrs,
        ...props,
        class: classNames.linkContent,
        // ...item.onClick
        //   ? { onClick: item.onClick }
        //   : {},
      },
      icon: {
        class: classNames.icon,
        ...iconProps,
      },
      text: {
        class: classNames.label,
      },
      secondaryText: {
        class: classNames.secondaryText,
      },
    })

    return h('div', slotProps.linkContent, [
      hasIcons && (slots.icon?.(props) || h(Icon, slotProps.icon)),
      slots.text?.({ item, classNames }) || h('span', slotProps.text, item.text || item.name),
      slots.secondaryText?.({ item, classNames }) || h('span', slotProps.secondaryText, item.secondaryText),
    ])
  },
})
