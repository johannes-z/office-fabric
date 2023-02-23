import { h } from 'vue'
import { asSlotProps, useStylingProps } from '@/utils'

export const OverflowButton = (props, { attrs, slots }) => {
  const { className, overflowItems = [] } = props

  const modifiedOverflowItems = overflowItems

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      class: className ?? attrs.class,
    },
  })

  console.log({
    overflowItems,
    modifiedOverflowItems,
  })

  return h('div', slotProps.root, slots.overflow?.(modifiedOverflowItems))
}

OverflowButton.props = Object.keys({
  ...useStylingProps(),

  overflowItems: { type: Array as () => any[], default: () => [] },
})
