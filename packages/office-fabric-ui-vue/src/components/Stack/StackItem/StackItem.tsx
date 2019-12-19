
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { StackItemStyles as styles } from './StackItem.styles'
import { getTheme } from '@uifabric-vue/styling'

import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component({
  // @ts-ignore
  functional: true,
  components: {},
})
export default class StackItem extends Vue {
  @Prop() grow
  @Prop() shrink
  @Prop() disableShrink
  @Prop() align
  @Prop() verticalFill
  @Prop({ type: Number, default: null }) order!: number

  render (h: CreateElement, context: RenderContext<any>) {
    const { grow, shrink, disableShrink, align, verticalFill, order, className } = context.props

    const classNames = getClassNames(() => styles({
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
