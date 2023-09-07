import { classNamesFunction } from '@fluentui-vue/utilities'
import { defineComponent, h } from 'vue'
import type { IAnnouncedStyles } from './Announced.types'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<{}, IAnnouncedStyles>()

export const AnnouncedBase = defineFunctionalComponent({
  name: 'AnnouncedBase',

  props: {
    ...makeStylingProps(),

    message: { type: String, default: undefined },
    as: { type: String, default: undefined },
  },

  render(props, { attrs, slots }) {
    const { message, styles, as: Root = 'div', className } = props

    const classNames = getClassNames(styles, { className })

    const slotProps = asSlotProps({
      root: {
        ...attrs,
        role: 'status',
        class: classNames.root,
      },
      screenReaderText: {
        class: classNames.screenReaderText,
      },
    })

    return h(Root, slotProps.root, [
      h('div', slotProps.screenReaderText, message),
    ])
  },
})
