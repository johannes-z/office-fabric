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

    return h(BaseButton, {
      attrs: {
        ...this.$props,
        ...this.$attrs,
        styles: internalStyles,
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  }
}
