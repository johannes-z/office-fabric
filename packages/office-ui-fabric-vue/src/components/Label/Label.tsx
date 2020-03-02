import { Component, Prop } from 'vue-property-decorator'
import { ILabelProps, ILabelStyles } from './Label.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement, VNode } from 'vue'
import StatelessComponent from '../StatelessComponent'

const getClassNames = classNamesFunction<any, ILabelStyles>({
  disableCaching: true,
})

@Component
export default class Label extends StatelessComponent<ILabelProps> {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean

  render (h: CreateElement, context: any): VNode {
    const { theme, className, disabled, required } = context.props

    const classNames = getClassNames(context.props.styles, {
      className,
      disabled,
      required,
      theme: theme!,
    })

    return (
      <label class={classNames.root} {...context.data}>
        {context.children}
      </label>
    )
  }
}
