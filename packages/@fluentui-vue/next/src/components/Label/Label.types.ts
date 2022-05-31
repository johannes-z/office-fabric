import type { ITheme } from '@fluentui-vue/theme'
import type { IStyle } from '@fluentui/merge-styles'

export interface ILabelStyleProps {
  theme: ITheme;
  className?: string
  disabled?: boolean
  required?: boolean
}
export interface ILabelStyles {
  /**
   * Styles for the root element.
   */
  root: IStyle
}
