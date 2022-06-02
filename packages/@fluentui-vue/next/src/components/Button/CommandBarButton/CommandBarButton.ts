import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CommandBarButton.styles'

export const CommandBarButton = Vue.extend({
  name: 'CommandBarButton',

  functional: true,

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  render (h: CreateElement, ctx) {
    const { styles } = ctx.props

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: {
          ...ctx.props,
          ...ctx.data.props,
          variantClassName: 'ms-Button--commandBar',
          styles: getStyles(styles),
        },
      },
    })

    return h(BaseButton, slotProps.root, ctx.children)
  },
})
