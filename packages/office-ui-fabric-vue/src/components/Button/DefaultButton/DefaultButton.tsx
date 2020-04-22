import { Vue, Component, Prop } from 'vue-property-decorator'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { getStyles } from './DefaultButton.styles'
import BaseComponent from '../../BaseComponent'
import { IButtonProps } from '../Button.types'

@Component
export class DefaultButton extends BaseComponent<IButtonProps> {
  @Prop({ type: String, default: '' }) text!: string
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get internalStyles () {
    const { primary = false, theme } = this
    return getStyles(theme, this.styles, primary)
  }

  render () {
    const { primary, internalStyles } = this
    const props: IBaseButtonProps = {
      ...this.$props,
      variantClassName: primary ? 'ms-Button--primary' : 'ms-Button--default',
      styles: internalStyles,
    }
    return (
      <BaseButton {...{ props, attrs: this.$attrs }}>
        {this.$slots.default}
      </BaseButton>
    )
  }
}
