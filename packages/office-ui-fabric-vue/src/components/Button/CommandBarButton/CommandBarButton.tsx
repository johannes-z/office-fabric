import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from '../../Icon/'
import BaseComponent from '../../BaseComponent'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { getStyles } from './CommandBarButton.styles'

@Component
export class CommandBarButton extends BaseComponent {
  get internalStyles () {
    const { theme, styles } = this
    return getStyles(theme, styles)
  }

  render () {
    const props: IBaseButtonProps = {
      variantClassName: 'ms-Button--commandBar',
      styles: this.internalStyles,
    }
    return (
      <BaseButton {...{ props, attrs: this.$attrs }}>
        {this.$slots.default}
      </BaseButton>
    )
  }
}
