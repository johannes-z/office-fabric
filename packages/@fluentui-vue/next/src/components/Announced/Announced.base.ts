import { asSlotProps, useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { VNode } from 'vue'
import { IAnnouncedStyles } from './Announced.types'

const getClassNames = classNamesFunction<{}, IAnnouncedStyles>()

export const AnnouncedBase = Vue.extend({
  name: 'AnnouncedBase',

  functional: true,

  props: {
    ...useStylingProps(),

    message: { type: String, default: undefined },
    as: { type: String, default: undefined },
  },

  render (h, ctx): VNode {
    const { message, styles, as: Root = 'div', className } = ctx.props

    const classNames = getClassNames(styles, { className })

    const slotProps = asSlotProps({
      root: {
        attrs: {
          role: 'status',
        },
        ...ctx.data,
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
