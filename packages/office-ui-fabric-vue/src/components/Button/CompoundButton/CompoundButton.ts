import BaseComponent from '../../BaseComponent'
import { getStyles } from './CompoundButton.styles'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import Vue, { CreateElement, VNode } from 'vue'
import { withThemeableProps } from '@/useThemeable'
import { IButtonStyles } from '..'

export const CompoundButton = Vue.extend({
  props: {
    ...withThemeableProps(),
    primary: { type: Boolean, default: false },
  },

  computed: {
    internalStyles (): IButtonStyles {
      const { primary = false, theme, styles } = this
      return getStyles(theme, styles, primary)
    },
  },

  render (h: CreateElement): VNode {
    const { primary, internalStyles } = this

    const props: IBaseButtonProps = {
      variantClassName: primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
      styles: internalStyles,
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
