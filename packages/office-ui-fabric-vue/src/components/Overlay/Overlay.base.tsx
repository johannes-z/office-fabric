
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IOverlayProps, IOverlayStyles, IOverlayStyleProps } from './Overlay.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'

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

  render () {
    const { classNames } = this
    return (
      <div class={classNames.root}>
        {this.$slots.default}
      </div>
    )
  }
}
