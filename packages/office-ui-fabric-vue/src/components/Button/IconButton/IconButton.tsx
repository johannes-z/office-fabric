
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
    const { theme } = this
    return getStyles(theme, this.styles)
  }

  render () {
    const { internalStyles } = this
    const props: IBaseButtonProps = {
      variantClassName: 'ms-Button--icon',
      styles: internalStyles,
    }
    return (
      <BaseButton {...{ props, attrs: this.$attrs }}>
        {this.$slots.default}
      </BaseButton>
    )
  }
}
