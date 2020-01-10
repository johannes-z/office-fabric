import { IButtonStyles } from '../Button.types'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { memoizeFunction } from '@uifabric-vue/utilities'
import { ITheme, getFocusStyle } from '@uifabric/styling'
import { concatStyleSets } from '@uifabric/merge-styles'

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, focusInset?: string, focusColor?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme)
    const messageBarButtonStyles: IButtonStyles = {
      root: [
        getFocusStyle(theme, {
          inset: 1,
          highContrastStyle: {
            outlineOffset: '-4px',
            outlineColor: 'ActiveBorder',
          },
          borderColor: 'transparent',
        }),
        {
          height: 24,
          borderColor: theme.palette.neutralTertiaryAlt,
        },
      ],
    }

    return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles)!
  }
)
