import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILabelProps, ILabelStyles } from './Label.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement, VNode } from 'vue'

const getClassNames = classNamesFunction<any, ILabelStyles>({
  disableCaching: true,
})

@Component({
  // @ts-ignore
  functional: true,
})
export default class Label extends BaseComponent<ILabelProps, ILabelStyles> {
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
