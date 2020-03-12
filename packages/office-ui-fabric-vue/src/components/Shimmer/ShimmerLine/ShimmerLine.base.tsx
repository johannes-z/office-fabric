import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'
import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'

const getClassNames = classNamesFunction()

@Component
export default class ShimmerLineBase extends StatelessComponent {
  @Prop({ type: Number, default: 0 }) height!: number

  render (h: CreateElement, ctx: RenderContext) {
    const { height, styles, width = '100%', borderStyle, theme } = ctx.props

    const classNames: any = getClassNames(styles!, {
      theme: theme!,
      height,
      borderStyle,
    })

    return (
      <div style={{ width: width, minWidth: typeof width === 'number' ? `${width}px` : 'auto' }} class={classNames.root}>
        <svg width="2" height="2" class={classNames.topLeftCorner}>
          <path d="M0 2 A 2 2, 0, 0, 1, 2 0 L 0 0 Z" />
        </svg>
        <svg width="2" height="2" class={classNames.topRightCorner}>
          <path d="M0 0 A 2 2, 0, 0, 1, 2 2 L 2 0 Z" />
        </svg>
        <svg width="2" height="2" class={classNames.bottomRightCorner}>
          <path d="M2 0 A 2 2, 0, 0, 1, 0 2 L 2 2 Z" />
        </svg>
        <svg width="2" height="2" class={classNames.bottomLeftCorner}>
          <path d="M2 2 A 2 2, 0, 0, 1, 0 0 L 0 2 Z" />
        </svg>
      </div>
    )
  }
}
