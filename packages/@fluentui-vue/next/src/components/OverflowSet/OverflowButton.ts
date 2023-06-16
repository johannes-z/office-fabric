import { h } from 'vue'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'

export const OverflowButton = defineFunctionalComponent({
  name: 'OverflowButton',

  props: {
    ...makeStylingProps(),

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
