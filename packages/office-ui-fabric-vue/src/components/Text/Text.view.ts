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

  render (h: CreateElement, ctx: RenderContext) {
    const { theme, styles, block, nowrap, variant } = ctx.props
    const classNames = getClassNames(styles, {
      theme,
      block,
      nowrap,
      variant,
    })

    return h('span', {
      ...ctx.data,
      class: classNames.root,
    }, ctx.children)
  }
}
