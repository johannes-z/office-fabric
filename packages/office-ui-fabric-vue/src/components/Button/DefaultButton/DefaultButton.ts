import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { getStyles } from './DefaultButton.styles'
import BaseComponent from '../../BaseComponent'
import { IButtonProps } from '../Button.types'
import Vue, { CreateElement, VNode } from 'vue'
import { IButtonStyles } from '@/components'
import { withThemeableProps } from '@/useThemeable'

export const DefaultButton = Vue.extend({
  props: {
    ...withThemeableProps(),
    text:{ type: String, default: '' },
    primary:{ type: Boolean, default: false },
    disabled:{ type: Boolean, default: false },
  },

  computed: {
    internalStyles (): IButtonStyles {
      const { primary = false, theme } = this
      return getStyles(theme, this.styles, primary)
    }
  },

  render (h: CreateElement): VNode {
    const { primary, internalStyles } = this
    const props: IBaseButtonProps = {
      variantClassName: primary ? 'ms-Button--primary' : 'ms-Button--default',
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
  }
})
