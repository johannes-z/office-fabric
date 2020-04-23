import { IStyleFunction } from '@uifabric/merge-styles'
import { IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types'

export const getStyles: IStyleFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles> = (
  props: IVerticalDividerPropsStyles,
): IVerticalDividerStyles => {
  const { theme, className } = props

  if (!theme) {
    throw new Error('Theme is undefined or null.')
  }

  return {
    wrapper: [
      {
        display: 'inline-flex',
        height: '100%',
        alignItems: 'center',
      },
      className,
    ],
    divider: [
      {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.neutralTertiaryAlt,
      },
    ],
  }
}
