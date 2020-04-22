import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './MessageBarButton.styles'
import BaseComponent from '../../BaseComponent'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { IBaseButtonProps, BaseButton } from '../BaseButton'

@Component({
  components: { DefaultButton },
})
export class MessageBarButton extends BaseComponent {
  get internalStyles () {
    return getStyles(this.theme, this.styles)
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
