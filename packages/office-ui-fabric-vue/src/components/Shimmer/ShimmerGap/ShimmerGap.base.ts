import StatelessComponent from '../../StatelessComponent'
import { CreateElement, RenderContext } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '../../../Utilities'
import { IShimmerGapProps, IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types'

const getClassNames = classNamesFunction<IShimmerGapStyleProps, IShimmerGapStyles>()

@Component
export class ShimmerGapBase extends StatelessComponent {
  @Prop({ type: Number, default: 0 }) height!: number
  @Prop({ type: String, default: 'auto' }) width!: string

  render (h: CreateElement, ctx: RenderContext) {
    const { height, styles, width = '10px', borderStyle, theme } = ctx.props

    const classNames = getClassNames(styles!, {
      theme: theme!,
      height,
      borderStyle,
    })

    return h('div', {
      class: classNames.root,
      style: { width: width, minWidth: typeof width === 'number' ? `${width}px` : 'auto' },
    })
  }
}
