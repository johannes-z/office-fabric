import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'
import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { IShimmerCircleStyleProps, IShimmerCircleStyles } from './ShimmerCircle.types'

const getClassNames = classNamesFunction<IShimmerCircleStyleProps, IShimmerCircleStyles>()

@Component
export class ShimmerCircleBase extends StatelessComponent {
  @Prop({ type: Number, default: 0 }) height!: number
  @Prop({ type: String, default: 'auto' }) width!: string

  render (h: CreateElement, ctx: RenderContext) {
    const { height, styles, borderStyle, theme } = ctx.props
    const classNames = getClassNames(styles!, {
      theme: theme!,
      height,
      borderStyle,
    })

    return (
      <div class={classNames.root}>
        <svg viewBox="0 0 10 10" width={height} height={height} class={classNames.svg}>
          <path d="M0,0 L10,0 L10,10 L0,10 L0,0 Z M0,5 C0,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,2.22044605e-16 5,0 C2.23857625,-2.22044605e-16 0,2.23857625 0,5 L0,5 Z" />
        </svg>
      </div>
    )
  }
}
