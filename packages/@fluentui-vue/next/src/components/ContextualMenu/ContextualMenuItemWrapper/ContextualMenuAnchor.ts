import { h } from 'vue'
import { ContextualMenuItem } from '../ContextualMenuItem'
import { StylingPropKeys, asSlotProps } from '@/utils'

export function ContextualMenuAnchor(props, { attrs, slots }) {
  const {
    item,
    classNames,
  } = props

  const slotProps = asSlotProps({
    root: {
      class: classNames.root,
      href: item.href,
      target: item.target,
    },
    item: {
      ...attrs,
      ...props,
    },
  })

  return h('a', slotProps.root, [
    h(ContextualMenuItem, slotProps.item),
  ])
}
ContextualMenuAnchor.props = [
  ...StylingPropKeys,
  'item',
  'hasIcons',
  'classNames',
]
