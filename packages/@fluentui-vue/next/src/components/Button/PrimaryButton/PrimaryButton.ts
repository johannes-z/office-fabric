import { asSlotProps, useStylingProps } from '@/utils'
import Vue, { CreateElement, VNode } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { useBaseButtonProps } from '../useBaseButton'

export const PrimaryButton = Vue.extend({
  name: 'PrimaryButton',

  functional: true,

  props: {
    ...useStylingProps(),
    ...useBaseButtonProps(),
  },

  render (h: CreateElement, ctx): VNode {
    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        props: {
          ...ctx.props,
          primary: true,
        },
      },
    })
    return h(DefaultButton, slotProps.root, ctx.children)
  },
})
