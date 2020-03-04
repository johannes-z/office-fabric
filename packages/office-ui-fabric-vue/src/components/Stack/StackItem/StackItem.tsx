
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { StackItemStyles as styles } from './StackItem.styles'
import { getTheme } from '@uifabric/styling'

import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'

const getClassNames = classNamesFunction()

@Component({
  components: {},
})
export default class StackItem extends StatelessComponent {
  @Prop() grow
  @Prop() shrink
  @Prop() disableShrink
  @Prop() align
  @Prop() verticalFill
  @Prop({ type: Number, default: null }) order!: number

  @Prop({ type: Number, default: 0 }) test!: number

  render (h: CreateElement, context: RenderContext<any>) {
    const { grow, shrink, disableShrink, align, verticalFill, order, className } = context.props

    const classNames: any = getClassNames(() => styles({
      grow,
      shrink,
      disableShrink,
      align,
      verticalFill,
      order,
      className,
    }, getTheme(), {}), {})

    return (
      <div className={classNames.root}>{context.children}</div>
    )
  }
}
