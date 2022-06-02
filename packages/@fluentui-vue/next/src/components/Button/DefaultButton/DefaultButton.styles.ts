import { FontWeights } from '@fluentui-vue/theme'
import { getGlobalClassNames, memoizeFunction } from '@fluentui-vue/utilities'
import { concatStyleSets } from '@fluentui/merge-styles'
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles'
import { primaryStyles, standardStyles } from '../ButtonThemes'

const DEFAULT_BUTTON_HEIGHT = '32px'
const DEFAULT_BUTTON_MIN_WIDTH = '80px'

export const getStyles = memoizeFunction(
  (customStyles?: IButtonStyles, primary?: boolean): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles()
    // const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme)
    const defaultButtonStyles: IButtonStyles = {
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
      primary ? primaryStyles() : standardStyles(),
      // splitButtonStyles,
      customStyles,
    )!
  },
)
