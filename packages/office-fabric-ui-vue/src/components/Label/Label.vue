<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILabelProps, ILabelStyles } from './Label.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { concatStyleSetsWithProps } from '@uifabric/merge-styles'
import { CreateElement, VNode } from 'vue'

const getClassNames = classNamesFunction<any, ILabelStyles>({
  disableCaching: true,
})

@Component({
  // @ts-ignore
  functional: true,
})
export default class Label extends BaseComponent<ILabelProps, ILabelStyles> {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean

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
</script>
