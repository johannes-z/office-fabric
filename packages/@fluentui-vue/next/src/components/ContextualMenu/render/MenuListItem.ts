import { h } from 'vue'
import { StylingPropKeys, asSlotProps } from '@/utils'

export function MenuListItem(props, { attrs, slots }) {
  const {
    classNames,
    title,
  } = props

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      ...props,
      class: classNames.item,
      title,
      role: 'presentation',
    },
  })

  return h('li', slotProps.root, slots)
}
MenuListItem.props = [...StylingPropKeys, 'classNames', 'title']
