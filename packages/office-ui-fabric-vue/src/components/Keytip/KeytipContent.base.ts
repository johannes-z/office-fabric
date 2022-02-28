import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'
import { IKeytipStyleProps, IKeytipStyles } from './Keytip.types'

/**
 * A component corresponding the content rendered inside the callout of the keytip component.
 * {@docCategory Keytips}
 */
export class KeytipContentBase extends StatelessComponent {
  public render (h: CreateElement, ctx: RenderContext): JSX.Element {
    const { content, styles, theme, disabled, visible } = ctx.props

    const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>()
    const classNames = getClassNames(styles!, {
      theme: theme!,
      disabled,
      visible,
    })

    return h('div', { class: classNames.container }, [
      h('span', { class: classNames.root }, content),
    ])
  }
}
