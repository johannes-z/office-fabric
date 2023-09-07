import { getFocusStyle } from '@fluentui-vue/style-utilities'
import type { ITheme } from '@fluentui-vue/theme'
import { memoizeFunction } from '@fluentui-vue/utilities'
import { concatStyleSets } from '@fluentui/merge-styles'
import type { IButtonStyles } from '../Button.types'

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles =>
    concatStyleSets(
      {
        root: [
          getFocusStyle(theme, {
            inset: 1,
            highContrastStyle: {
              outlineOffset: '-4px',
              outline: '1px solid Window',
            },
            borderColor: 'transparent',
          }),
          {
            height: 24,
          },
        ],
      },
      customStyles,
    ),
)
