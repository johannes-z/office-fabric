<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { styles } from './Stack.styles'
import { IStackTokens } from './Stack.types'
import StatelessComponent from '../StatelessComponent'
import { VNode, CreateElement, RenderContext } from 'vue'
import { mergeStyleSets } from '@uifabric/styling'

const getClassNames = classNamesFunction()

@Component({
  components: {},
})
export default class Stack extends StatelessComponent {
  @Prop({ type: String, default: '' }) verticalFill!: string
  @Prop({ type: Boolean, default: false }) horizontal!: boolean
  @Prop({ type: Boolean, default: false }) reversed!: boolean
  @Prop({ type: Number, default: 0 }) childrenGap!: number
  @Prop({ type: Boolean, default: false }) grow!: boolean
  @Prop({ type: Boolean, default: false }) wrap!: boolean
  @Prop({ type: String, default: '' }) horizontalAlign!: string
  @Prop({ type: String, default: '' }) verticalAlign!: string
  @Prop({ type: Boolean, default: false }) disableShrink!: boolean

  @Prop({ type: Object, default: () => {} }) tokens!: IStackTokens

  render (h: CreateElement, ctx: RenderContext): VNode {
    const { theme, tokens, verticalFill, horizontal, reversed, grow, wrap, horizontalAlign, verticalAlign, disableShrink, className } = ctx.props

    const classNames: any = getClassNames(mergeStyleSets(styles({
      className,
      verticalFill,
      horizontal,
      reversed,
      grow,
      wrap,
      horizontalAlign,
      verticalAlign,
      disableShrink,
    }, theme, tokens), ctx.props.styles))

    return h('div', {
      ...ctx.data,
      class: classNames.root,
    }, ctx.children)
  }
}
</script>
