import Vue, { CreateElement, VNode } from 'vue'
import { useStylingProps, asSlotProps } from '@/utils'
import { BaseButton } from '../BaseButton'
import { getStyles } from './DefaultButton.styles'
import { useBaseButtonProps } from '../useBaseButton'

export const DefaultButton = Vue.extend({
  name: 'DefaultButton',

  functional: true,

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),

    primary: { type: Boolean, default: false },
  },

  render (h: CreateElement, ctx): VNode {
    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: {
          ...ctx.props,
          variantClassName: ctx.props.primary ? 'ms-Button--primary' : 'ms-Button--default',
          styles: getStyles(ctx.props.styles, ctx.props.primary),
        },
      },
    })

    return h(BaseButton, slotProps.root, ctx.children)
  },
})
