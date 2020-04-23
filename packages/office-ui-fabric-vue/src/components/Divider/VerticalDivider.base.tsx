import { IVerticalDividerProps, IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types'
import StatelessComponent from '../StatelessComponent'
import { RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles>()

export class VerticalDividerBase extends StatelessComponent<IVerticalDividerProps> {
  render (h, ctx: RenderContext) {
    const { styles, theme, className } = ctx.props

    const classNames = getClassNames(styles, { theme: theme, className })
    return (
      <span class={classNames.wrapper}>
        <span class={classNames.divider} />
      </span>
    )
  }
}
