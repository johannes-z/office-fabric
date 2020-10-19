import { IVerticalDividerProps, IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types'
import StatelessComponent from '../StatelessComponent'
import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles>()

export class VerticalDividerBase extends StatelessComponent<IVerticalDividerProps> {
  render (h: CreateElement, ctx: RenderContext) {
    const { styles, theme, className } = ctx.props
    const classNames = getClassNames(styles, { theme, className })

    return h('span', { class: classNames.wrapper }, [
      h('span', { class: classNames.divider }),
    ])
  }
}
