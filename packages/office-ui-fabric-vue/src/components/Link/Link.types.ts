import { IStyle, IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { ITheme } from '@uifabric/styling'

export interface ILinkProps {
  className?: string
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
  href?: string;

  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyleProps {
  className?: string;
  isButton?: boolean;
  isDisabled?: boolean;
  theme: ITheme;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyles {
  root: IStyle;
}
