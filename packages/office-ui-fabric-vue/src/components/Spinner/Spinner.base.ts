import { Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'
import { CreateElement, RenderContext } from 'vue'
import { ISpinnerProps, SpinnerLabelPosition } from './Spinner.types'

const getClassNames = classNamesFunction()

@Component
export default class Spinner extends StatelessComponent<ISpinnerProps> {
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: 'bottom' }) labelPosition!: SpinnerLabelPosition
  @Prop({ type: Number, default: 20 }) size!: number

  render (h: CreateElement, ctx: RenderContext) {
    const { theme, styles, className, size, label, labelPosition } = ctx.props
    const classNames: any = getClassNames(styles, {
      theme,
      size,
      className,
      labelPosition,
    })

    const $circle = h('div', { class: classNames.circle })
    const $label = (ctx.scopedSlots.default || label) && h('div',
      { class: classNames.label }, ctx.scopedSlots.default ? [
        ctx.scopedSlots.default({}),
      ] : label)

    return h('div', { class: classNames.root }, [
      $circle,
      $label,
    ])
  }
}
