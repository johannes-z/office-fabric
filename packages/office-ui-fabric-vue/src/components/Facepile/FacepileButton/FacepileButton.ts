import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './FacepileButton.styles'
import BaseComponent from '../../BaseComponent'
import { BaseButton } from '../../Button'
import { CreateElement } from 'vue'

@Component
export class FacepileButton extends BaseComponent {
  get internalStyles () {
    return getStyles(this.theme, this.className, this.styles)
  }

  render (h: CreateElement) {
    const props = {
      ...this.$props,
      variantClassName: 'ms-Button--facepile',
      styles: this.internalStyles,
    }
    return h(
      BaseButton, {
        attrs: this.$attrs,
        props,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.flex,
    )
  }
}
