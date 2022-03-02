import { Vue, Component, Prop } from 'vue-property-decorator'
import { BaseButton } from '../BaseButton'
import BaseComponent from '../../BaseComponent'
import { getStyles } from './ActionButton.styles'
import { IButtonProps } from '../Button.types'
import { CreateElement, VNode } from 'vue'
import { IButtonStyles } from '@/components'
import { withThemeableProps } from '@/useThemeable'

export const ActionButton = Vue.extend({
  props: {
    ...withThemeableProps(),
    href: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    iconProps: { type: Object, default: null },
  },

  computed: {
    internalStyles (): IButtonStyles {
      const { theme, styles } = this
      return getStyles(theme, styles)
    }
  },

  render (h: CreateElement): VNode {
    const props = {
      ...this.$props,
      variantClassName: 'ms-Button--action ms-Button--command',
      styles: this.internalStyles,
    }
    return h(BaseButton, {
      props,
      attrs: this.$attrs,
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  }
})
