import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './FacepileButton.styles'
import BaseComponent from '../../BaseComponent'
import { BaseButton } from '../../Button/'

@Component
export class FacepileButton extends BaseComponent {
  get internalStyles () {
    return getStyles(this.theme, this.className, this.styles)
  }

  render () {
    const props = {
      ...this.$props,
      variantClassName: 'ms-Button--facepile',
      styles: this.internalStyles,
    }
    return (
      <BaseButton {...{
        props,
        attrs: this.$attrs,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
      }}>
        {this.$slots.flex}
      </BaseButton>
    )
  }
}
