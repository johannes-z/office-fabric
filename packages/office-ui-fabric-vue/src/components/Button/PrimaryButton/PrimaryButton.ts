import { withThemeableProps } from '@/useThemeable'
import Vue, { CreateElement, VNode } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'

export const PrimaryButton = Vue.extend({
  props: {
    ...withThemeableProps(),
  },

  render (h: CreateElement): VNode {
    return h(DefaultButton, {
      attrs: {
        ...this.$props,
        ...this.$attrs,
      },
      props: {
        primary: true,
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  },
})
