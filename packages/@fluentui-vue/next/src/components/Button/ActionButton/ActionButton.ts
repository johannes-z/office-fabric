import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { BaseButton } from '../BaseButton'
import { getStyles } from './ActionButton.styles'

export const ActionButton = Vue.extend({
  name: 'ActionButton',

  functional: true,

  props: {
    ...useStylingProps(),

    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    iconProps: { type: Object, default: () => {} },
  },

  render (h: CreateElement, ctx): VNode {
    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: {
          ...ctx.data.attrs,
          ...ctx.props,
          variantClassName: 'ms-Button--action ms-Button--comand',
          styles: getStyles(ctx.props.styles),
        },
      },
    })

    return h(BaseButton, slotProps.root, ctx.children)
  },
})
