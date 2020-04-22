import { Vue, Component, Prop } from 'vue-property-decorator'
import { BaseButton } from '../BaseButton'
import BaseComponent from '../../BaseComponent'
import { getStyles } from './ActionButton.styles'
import { IButtonProps } from '../Button.types'

@Component
export class ActionButton extends BaseComponent<IButtonProps> {
  @Prop({ type: String, default: '' }) href!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Object, default: null }) iconProps!: any

  get internalStyles () {
    const { theme, styles } = this
    return getStyles(theme, styles)
  }

  render () {
    const props = {
      ...this.$props,
      variantClassName: 'ms-Button--action ms-Button--command',
      styles: this.internalStyles,
    }
    return (
      <BaseButton
        {...{
          props,
          attrs: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
        }}
      />
    )
  }
}
