import { h } from 'vue'
import type { IMenuItemClassNames } from '../ContextualMenu.classNames'
import { asSlotProps } from '@/utils'

export function MenuSeparator(props, { attrs, slots }) {
  const {
    index,
    classNames,
    top,
    fromSection,
  } = props
  if (!fromSection && index <= 0)
    return

  const slotProps = asSlotProps({
    root: {
      key: `separator-${index}${top === undefined ? '' : top ? '-top' : '-bottom'}`,
      class: classNames.divider,
      'aria-hidden': true,
      role: 'separator',
    },
  })

  return h('li', slotProps.root)
}
MenuSeparator.props = Object.keys({
  index: { type: Number, required: true },
  classNames: {
    type: Object as () => IMenuItemClassNames,
    required: true,
  },
  top: { type: Boolean, default: undefined },
  fromSection: { type: Boolean, default: undefined },
})
