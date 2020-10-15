
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IOverlayProps, IOverlayStyles, IOverlayStyleProps } from './Overlay.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>()

@Component
export class OverlayBase extends BaseComponent<IOverlayProps, IOverlayStyles> {
  @Prop({ type: Boolean, default: false }) dark!: boolean

  get classNames () {
    const { theme, className, dark: isDark } = this
    return getClassNames(this.styles, {
      theme,
      className,
      isDark,
    })
  }

  render (h: CreateElement) {
    const { classNames } = this
    return h('div', { class: classNames.root }, this.$slots.default)
  }
}
