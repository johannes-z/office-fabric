import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { getStyles } from './MessageBarButton.styles'

export const MessageBarButton = Vue.extend({
  name: 'MessageBarButton',

  functional: true,

  props: {
    ...useStylingProps(),
  },

  render (h: CreateElement, ctx): VNode {
    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: {
          ...ctx.props,
          styles: getStyles(ctx.props.theme, ctx.props.styles),
        },
      },
    })

    return h(DefaultButton, slotProps.root, ctx.children)
  },
})
