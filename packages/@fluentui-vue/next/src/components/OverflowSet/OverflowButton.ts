import { h } from 'vue'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

export const OverflowButton = defineFunctionalComponent({
  name: 'OverflowButton',

  props: {
    ...useStylingProps(),

    overflowItems: { type: Array as () => any[], default: () => [] },
  },

  render(props, { attrs, slots }) {
    const { className, overflowItems = [] } = props

    const modifiedOverflowItems = overflowItems

    const slotProps = asSlotProps({
      root: {
        ...attrs,
        class: className ?? attrs.class,
      },
    })

    return h('div', slotProps.root, {
      default: () => slots.overflow?.(modifiedOverflowItems),
    })
  },
})
