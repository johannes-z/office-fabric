import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { getStyles } from './CompoundButton.styles'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { CreateElement } from 'vue'

@Component
export class CompoundButton extends BaseComponent {
  @Prop({ type: Boolean, default: false }) primary!: boolean

  get internalStyles () {
    const { primary = false, theme } = this
    const styles = {}
    return getStyles(theme, styles, primary)
  }

  render (h: CreateElement) {
    const { primary, internalStyles } = this
    const props: IBaseButtonProps = {
      variantClassName: primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
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
