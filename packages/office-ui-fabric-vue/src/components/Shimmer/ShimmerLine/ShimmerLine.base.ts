import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'
import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'

const getClassNames = classNamesFunction()

@Component
export class ShimmerLineBase extends StatelessComponent {
  @Prop({ type: Number, default: 16 }) height!: number
  @Prop({ type: String, default: '100%' }) width!: string
  @Prop({ type: String, default: '' }) borderStyle!: string

  render (h: CreateElement, ctx: RenderContext) {
    const { height, styles, width, borderStyle, theme } = ctx.props

    const classNames: any = getClassNames(styles!, {
      theme: theme!,
      height,
      borderStyle,
    })

    function createSvg (className: string, path: string) {
      return h('svg', {
        attrs: {
          width: '2',
          height: '2',
          class: className,
        },
      }, [
        h('path', {
          attrs: { d: path },
        }),
      ])
    }

    return h('div', {
      style: { width: width, minWidth: typeof width === 'number' ? `${width}px` : 'auto' },
      class: classNames.root,
    }, [
      createSvg(classNames.topLeftCorner, 'M0 2 A 2 2, 0, 0, 1, 2 0 L 0 0 Z'),
      createSvg(classNames.topRightCorner, 'M0 0 A 2 2, 0, 0, 1, 2 2 L 2 0 Z'),
      createSvg(classNames.bottomRightCorner, 'M2 0 A 2 2, 0, 0, 1, 0 2 L 2 2 Z'),
      createSvg(classNames.bottomLeftCorner, 'M2 2 A 2 2, 0, 0, 1, 0 0 L 0 2 Z'),
    ])
  }
}
