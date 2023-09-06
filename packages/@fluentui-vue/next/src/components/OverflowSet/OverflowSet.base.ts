import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { OverflowButton } from './OverflowButton'
import type { IOverflowSetStyleProps, IOverflowSetStyles } from './OverflowSet.types'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>()

export const OverflowSetBase = defineFunctionalComponent({
  name: 'OverflowSetBase',

  props: {
    ...makeStylingProps(),

    vertical: { type: Boolean, default: false },
    overflowSide: { type: String, default: 'end', validator: e => ['start', 'end'].includes(e) },
    role: { type: String, default: 'group' },

    items: { type: Array as () => any[], default: () => [] },
    overflowItems: { type: Array as () => any[], default: () => [] },
  },

  render(props, { attrs, slots }) {
    const {
      styles,
      className,
      vertical,
      items,
      overflowItems,
      overflowSide = 'end',
      role = 'group',
    } = props

    const classNames = getClassNames(styles, {
      className,
      vertical,
    })

    const slotProps = asSlotProps({
      root: {
        class: classNames.root,
        role: role || 'group',
        'aria-orientation': role === 'menubar' ? (vertical === true ? 'vertical' : 'horizontal') : undefined,
      },
      item: {
        class: classNames.item,
        role: 'none',
      },
      overflowButton: {
        ...attrs,
        ...props,
        class: classNames.overflowButton,
      },
    })

    const showOverflow = !!overflowItems && overflowItems.length > 0

    return h('div', slotProps.root, {
      default: () => [
        // overflowbutton
        overflowSide === 'start' && showOverflow && h(OverflowButton, slotProps.overflowButton, slots),
        // items
        items && items.map((item, index) => h('div', {
          ...slotProps.item,
          onClick: item.onClick,
        }, slots.item?.({ item, index }))),
        // overflowbutton
        overflowSide === 'end' && showOverflow && h(OverflowButton, slotProps.overflowButton, slots),
      ],
    })
  },
})
