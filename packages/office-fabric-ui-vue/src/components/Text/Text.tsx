import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ITextStyles } from './Text.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement, RenderContext } from 'vue'

const getClassNames = classNamesFunction<any, ITextStyles>()

@Component({
  // @ts-ignore
  functional: true,
})
export default class Text extends BaseComponent {
  @Prop({ type: Boolean, default: false }) nowrap!: boolean
  @Prop({ type: Boolean, default: false }) block!: boolean
  @Prop({ type: String, default: 'medium' }) variant!: string

  render (h: CreateElement, context: RenderContext) {
    const { theme, styles, block, nowrap, variant } = context.props
    const classNames = getClassNames(styles, {
      theme,
      block,
      nowrap,
      variant,
    })

    return (
      <span class={classNames.root}>
        {context.children}
      </span>
    )
  }
}
