import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './MessageBarButton.styles'
import BaseComponent from '../../BaseComponent'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import { IBaseButtonProps, BaseButton } from '../BaseButton'
import { CreateElement } from 'vue'

@Component({
  components: { DefaultButton },
})
export class MessageBarButton extends BaseComponent {
  get internalStyles () {
    return getStyles(this.theme, this.styles)
  }

  render (h: CreateElement) {
    const { internalStyles } = this
    const props: IBaseButtonProps = {
      variantClassName: 'ms-Button--icon',
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
