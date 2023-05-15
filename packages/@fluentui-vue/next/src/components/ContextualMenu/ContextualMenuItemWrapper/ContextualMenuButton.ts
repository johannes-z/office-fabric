import Vue, { VNode, h } from 'vue'
import { IMenuItemClassNames } from '../ContextualMenu.classNames'
import { IContextualMenuItem } from '../ContextualMenu.types'
import { ContextualMenuItem } from '../ContextualMenuItem'
import { StylingPropKeys, asSlotProps, useStylingProps } from '@/utils'

export function ContextualMenuButton(props, { attrs, slots }) {
  const {
    item,
    classNames,
  } = props

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      class: classNames.root,
      href: item.href,
      target: item.target,
    },
    item: {
      ...props,
    },
  })

  return h('button', slotProps.root, [
    h(ContextualMenuItem, slotProps.item),
  ])
}

ContextualMenuButton.props = [
  ...StylingPropKeys,
  'item',
  'hasIcons',
  'classNames',
]
