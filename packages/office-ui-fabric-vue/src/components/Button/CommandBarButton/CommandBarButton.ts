import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from '../../Icon'
import BaseComponent from '../../BaseComponent'
import { BaseButton, IBaseButtonProps } from '../BaseButton'
import { getStyles } from './CommandBarButton.styles'
import { CreateElement } from 'vue'

@Component
export class CommandBarButton extends BaseComponent {
  get internalStyles () {
    const { theme, styles } = this
    return getStyles(theme, styles)
  }

  render (h: CreateElement) {
    const props: IBaseButtonProps = {
      variantClassName: 'ms-Button--commandBar',
      styles: this.internalStyles,
      theme: this.theme,
    }
    return h(BaseButton, {
      attrs: {
        ...this.$props,
        ...props,
        ...this.$attrs,
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  }
}
