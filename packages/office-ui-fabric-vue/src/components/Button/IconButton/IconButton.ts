
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './IconButton.styles'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import BaseComponent from '../../BaseComponent'
import { CreateElement } from 'vue'

@Component({
  inheritAttrs: false,
})
export class IconButton extends BaseComponent {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Object, default: () => {} }) iconProps!: any

  get internalStyles () {
    const { theme, styles } = this
    return getStyles(theme, styles)
  }

  render (h: CreateElement) {
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
}
