import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILinkProps, ILinkStyles } from './Link.types'
import { CreateElement, RenderContext, VNode } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<any, ILinkStyles>()

@Component({
  // @ts-ignore
  functional: true,
})
export default class Link extends BaseComponent<ILinkProps, ILinkStyles> {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: '' }) href!: string

  render (h: CreateElement, context: RenderContext<any>) {
    const { theme, className, styles, href, disabled } = context.props

    const classNames = getClassNames(styles, {
      theme,
      className,
      isButton: !href,
      isDisabled: disabled,
    })

    const component = href ? 'a' : 'button'
    return h(component, {
      ...context.data,
      class: classNames.root,
      attrs: {
        ...context.data.attrs,
        ...href && { href },
        ...!href && { type: 'button' },
      },
    }, context.children)
  }
}
