import { Component, Prop } from 'vue-property-decorator'
import { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement, RenderContext, VNode } from 'vue'
import StatelessComponent from '../StatelessComponent'

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>({
  // Label is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Label.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

@Component
export class LabelBase extends StatelessComponent<ILabelProps> {
  @Prop({ type: String, default: 'label' }) as!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean

  render (h: CreateElement, context: RenderContext): VNode {
    const { as: RootType, theme, styles, className, disabled, required } = context.props

    const classNames = getClassNames(styles, {
      className,
      disabled,
      required,
      theme: theme!,
    })

    return h(RootType, {
      ...context.data,
      class: classNames.root,
    }, context.children)
  }
}
