
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { StackItemStyles as baseStyles } from './StackItem.styles'
import { getTheme, mergeStyleSets } from '@uifabric/styling'

import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'

const getClassNames = classNamesFunction({
  disableCaching: true,
})

@Component({
  components: {},
})
export default class StackItem extends StatelessComponent {
  @Prop({ type: [Number, Boolean], default: 0 }) grow
  @Prop() shrink
  @Prop() disableShrink
  @Prop() align
  @Prop() verticalFill
  @Prop({ type: Number, default: null }) order!: number

  @Prop({ type: Number, default: 0 }) test!: number

  render (h: CreateElement, ctx: RenderContext<any>) {
    const { grow, shrink, disableShrink, align, verticalFill, order, className, styles } = ctx.props

    const classNames: any = getClassNames(mergeStyleSets(baseStyles({
      grow,
      shrink,
      disableShrink,
      align,
      verticalFill,
      order,
      className,
    }, getTheme(), {}), styles))

    return h('div', { class: classNames.root }, ctx.children)
  }
}
