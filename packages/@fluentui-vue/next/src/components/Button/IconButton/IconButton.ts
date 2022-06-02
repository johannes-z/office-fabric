import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './IconButton.styles'

export const IconButton = Vue.extend({
  name: 'IconButton',

  functional: true,

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    iconProps: { type: Object, default: () => {} },
  },

  render (h: CreateElement, ctx): VNode {
    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: {
          ...ctx.props,
          variantClassName: 'ms-Button--icon',
          styles: getStyles(ctx.props.styles),
        },
      },
    })

    return h(BaseButton, slotProps.root, ctx.children)
  },
})
