import { IFontStyles, ITheme } from '@fluentui/style-utilities'
import { IStyle, IStyleFunctionOrObject } from '@uifabric/merge-styles'

export interface ITextProps {
  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Styles for the text.
   */
  styles?: IStyleFunctionOrObject<any, ITextStyles>;

  className?: string;

  /**
   * Optionally render the component as another component type or primitive.
   */
  as?: string;

  /**
   * Optional font type for Text.
   */
  variant?: keyof IFontStyles;

  /**
   * Whether the text is displayed as a block element.
   *
   * Note that in order for ellipsis on overflow to work properly,
   * `block` and `nowrap` should be set to true.
   */
  block?: boolean;

  /**
   * Whether the text is not wrapped.
   *
   * Note that in order for ellipsis on overflow to work properly,
   * `block` and `nowrap` should be set to true.
   */
  nowrap?: boolean;
}

export interface ITextStyles {
  root: IStyle
}
