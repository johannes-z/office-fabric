import { h } from 'vue'
import { Icon } from '../Icon'
import { StylingPropKeys, asSlotProps } from '@/utils'

export const ContextualMenuItemBase = (props, { attrs, slots }) => {
  const {
    classNames,
    item,
    hasIcons,
  } = props
  const iconProps = item.iconProps

  const slotProps = asSlotProps({
    linkContent: {
      ...attrs,
      class: classNames.linkContent,
      on: {
        // ...item.onClick
        //   ? { click: item.onClick }
        //   : {},
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
    hasIcons && (slots.icon?.(props) || h(Icon, slotProps.icon)),
    slots.text?.({ item, classNames }) || h('span', slotProps.text, item.text || item.name),
    slots.secondaryText?.({ item, classNames }) || h('span', slotProps.secondaryText, item.secondaryText),
  ])
}
ContextualMenuItemBase.props = [...StylingPropKeys, 'item',
  'hasIcons',
  'classNames']
