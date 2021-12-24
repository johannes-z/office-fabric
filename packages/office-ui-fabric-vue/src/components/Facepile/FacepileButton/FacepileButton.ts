import { withThemeableProps } from '@/useThemeable'
import Vue, { VNode } from 'vue'
import { BaseButton, IButtonStyles } from '../../Button'
import { getStyles } from './FacepileButton.styles'

export const FacepileButton = Vue.extend({
  props: {
    ...withThemeableProps(),
  },

  computed: {
    internalStyles (): IButtonStyles {
      return getStyles(this.theme, this.className, this.styles)
    },
  },

  render (h): VNode {
    return h(
      BaseButton, {
        attrs: this.$attrs,
        props: {
          ...this.$props,
          variantClassName: 'ms-Button--facepile',
          styles: this.internalStyles,
        },
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.flex,
    )
  },
})
