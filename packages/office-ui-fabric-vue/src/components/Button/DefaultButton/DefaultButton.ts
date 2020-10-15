import { Vue, Component, Prop } from 'vue-property-decorator'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { getStyles } from './DefaultButton.styles'
import BaseComponent from '../../BaseComponent'
import { IButtonProps } from '../Button.types'
import { CreateElement } from 'vue'

@Component
export class DefaultButton extends BaseComponent<IButtonProps> {
  @Prop({ type: String, default: '' }) text!: string
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get internalStyles () {
    const { primary = false, theme } = this
    return getStyles(theme, this.styles, primary)
  }

  render (h: CreateElement) {
    const { primary, internalStyles } = this
    const props: IBaseButtonProps = {
      ...this.$props,
      variantClassName: primary ? 'ms-Button--primary' : 'ms-Button--default',
      styles: internalStyles,
    }
    return h(BaseButton, {
      props,
      attrs: this.$attrs,
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  }
}
