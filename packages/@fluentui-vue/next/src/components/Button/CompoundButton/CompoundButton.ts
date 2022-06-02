import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { BaseButton } from '../BaseButton'
import { useBaseButtonProps } from '../useBaseButton'
import { getStyles } from './CompoundButton.styles'

export const CompoundButton = Vue.extend({
  name: 'CompoundButton',

  functional: true,

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
    primary: { type: Boolean, default: false },
  },

  render (h: CreateElement, ctx) {
    const { primary, styles } = ctx.props
    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        attrs: {
          ...ctx.props,
          ...ctx.data.attrs,
        },
        props: {
          ...ctx.props,
          variantClassName: primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
          styles: getStyles(styles, primary),
        },
      },
    })

    return h(BaseButton, slotProps.root, ctx.children)
  },
})
