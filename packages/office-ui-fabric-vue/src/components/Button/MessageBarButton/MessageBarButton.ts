import { IButtonStyles } from '@/components'
import { withThemeableProps } from '@/useThemeable'
import Vue, { CreateElement, VNode } from 'vue'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { getStyles } from './MessageBarButton.styles'

export const MessageBarButton = Vue.extend({
  props: {
    ...withThemeableProps()
  },

  computed: {
    internalStyles (): IButtonStyles {
      return getStyles(this.theme, this.styles)
    }
  },

  render (h: CreateElement): VNode {
    const { internalStyles } = this

    return h(DefaultButton, {
      attrs: {
        ...this.$props,
        ...this.$attrs,
        styles: internalStyles,
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  }
})
