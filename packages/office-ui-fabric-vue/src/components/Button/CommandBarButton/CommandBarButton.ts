import { IButtonStyles } from '@/components'
import { withThemeableProps } from '@/useThemeable'
import Vue, { CreateElement, VNode } from 'vue'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { getStyles } from './CommandBarButton.styles'

export const CommandBarButton = Vue.extend({
  props: {
    ...withThemeableProps(),
  },

  computed: {
    internalStyles (): IButtonStyles {
      const { theme, styles } = this
      return getStyles(theme, styles)
    },
  },

  render (h: CreateElement): VNode {
    const props: IBaseButtonProps = {
      variantClassName: 'ms-Button--commandBar',
      styles: this.internalStyles,
      theme: this.theme,
    }
    return h(BaseButton, {
      attrs: {
        ...this.$props,
        ...props,
        ...this.$attrs,
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  },
})
