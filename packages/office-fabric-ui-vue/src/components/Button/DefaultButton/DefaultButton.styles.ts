// import { IButtonStyles } from '../Button.types'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles'

import { primaryStyles, standardStyles } from '../ButtonThemes'
import { concatStyleSets } from '@uifabric/merge-styles'
import { memoizeFunction } from '@fabric-vue/utilities'
import { ITheme, FontWeights } from '@fabric-vue/styling'

const DEFAULT_BUTTON_HEIGHT = '32px'
const DEFAULT_BUTTON_MIN_WIDTH = '80px'

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: any, primary?: boolean): any => {
    const baseButtonStyles: any = getBaseButtonStyles(theme)
    const splitButtonStyles: any = getSplitButtonStyles(theme)
    const defaultButtonStyles: any = {
      root: {
        minWidth: DEFAULT_BUTTON_MIN_WIDTH,
        height: DEFAULT_BUTTON_HEIGHT,
      },
      label: {
        fontWeight: FontWeights.semibold,
      },
    }

    return concatStyleSets(
      baseButtonStyles,
      defaultButtonStyles,
      primary ? primaryStyles(theme) : standardStyles(theme),
      splitButtonStyles,
      customStyles
    )!
  }
)
