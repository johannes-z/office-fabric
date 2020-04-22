import { Component, Prop } from 'vue-property-decorator'
import { ITextStyles, ITextProps } from './Text.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement, RenderContext } from 'vue'
import StatelessComponent from '../StatelessComponent'

const getClassNames = classNamesFunction<any, ITextStyles>()

@Component
export default class Text extends StatelessComponent<ITextProps> {
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
      <span {...context.data} class={classNames.root}>
        {context.children}
      </span>
    )
  }
}
