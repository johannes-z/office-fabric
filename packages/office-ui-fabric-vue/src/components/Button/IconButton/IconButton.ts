
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './IconButton.styles'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import BaseComponent from '../../BaseComponent'
import { CreateElement, VNode } from 'vue'
import { IButtonStyles } from '@/components'
import { withThemeableProps } from '@/useThemeable'

export const IconButton = Vue.extend({
  props: {
    ...withThemeableProps(),
    disabled: { type: Boolean, default: false },
    iconProps: { type: Object, default: () => {} },
  },

  computed: {
    internalStyles (): IButtonStyles {
      const { theme, styles } = this
      return getStyles(theme, styles)
    }
  },

  render (h: CreateElement): VNode {
    const { iconProps, disabled, internalStyles } = this
    const props: IBaseButtonProps = {
      iconProps,
      disabled,
      variantClassName: 'ms-Button--icon',
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
