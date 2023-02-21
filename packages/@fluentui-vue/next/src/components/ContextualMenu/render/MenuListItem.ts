import { h } from 'vue'
import { StylingPropKeys, asSlotProps } from '@/utils'

export const MenuListItem = (props, { attrs, slots }) => {
  const {
    classNames,
    title,
  } = props

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      class: classNames.item,
      attrs: {
        title,
        role: 'presentation',
      },
    },
  })

  return h('li', slotProps.root, slots)
}
MenuListItem.props = [StylingPropKeys, 'classNames', 'title']
