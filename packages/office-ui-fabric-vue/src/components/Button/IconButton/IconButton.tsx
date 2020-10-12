
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './IconButton.styles'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import BaseComponent from '../../BaseComponent'

@Component({
  components: { BaseButton },
  inheritAttrs: false,
})
export class IconButton extends BaseComponent {
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get internalStyles () {
    const { theme, styles } = this
    return getStyles(theme, styles)
  }

  render () {
    const { disabled, internalStyles } = this
    const props: IBaseButtonProps = {
      disabled,
      variantClassName: 'ms-Button--icon',
      styles: internalStyles,
    }
    return (
      <BaseButton {...{ props, attrs: this.$attrs, on: this.$listeners }}>
        {this.$slots.default}
      </BaseButton>
    )
  }
}
