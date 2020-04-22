import { ITheme } from '@uifabric/styling'
import { IStyleFunctionOrObject, IStyle } from '@uifabric/merge-styles'

/**
 * {@docCategory Label}
 */
export interface ILabel {}

/**
 * {@docCategory Label}
 */
export interface ILabelProps {
  /**
   * Render the root element as another type.
   */
  as?: any;

  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  required?: boolean;

  /**
   * Renders the label as disabled.
   */
  disabled?: boolean;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Styles for the label.
   */
  styles?: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
}

/**
 * {@docCategory Label}
 */
export interface ILabelStyles {
  /**
   * Styles for the root element.
   */
  root: IStyle;
}

/**
 * {@docCategory Label}
 */
export interface ILabelStyleProps {
  /**
   *
   */
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}
