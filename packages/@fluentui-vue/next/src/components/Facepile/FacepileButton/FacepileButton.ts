import { BaseButton } from '@/components/Button/BaseButton'
import { useStylingProps } from '@/utils'
import Vue, { VNode } from 'vue'
import { getStyles } from './FacepileButton.styles'

export const FacepileButton = Vue.extend({
  name: 'FacepileButton',

  functional: true,

  props: {
    ...useStylingProps(),
  },

  render (h, ctx): VNode {
    const styles = getStyles(ctx.props.theme, ctx.props.className, ctx.props.styles)

    return h(BaseButton, {
      ...ctx.data,
      props: {
        ...ctx.data.props,
        variantClassName: 'ms-Button--facepile',
        styles,
      },
    })
  },
})
