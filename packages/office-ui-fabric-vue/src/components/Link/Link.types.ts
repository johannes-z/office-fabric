import { LinkBase } from './Link.base'

import { IStyle, ITheme } from '@uifabric/styling'
import { IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { Component } from 'vue'
// import { IKeytipProps } from '../../Keytip'

/**
 * {@docCategory Link}
 */
export interface ILink {
  /** Sets focus to the link. */
  focus(): void;
}

/**
 * {@docCategory Link}
 */
export interface ILinkHTMLAttributes<T> {
  // Shared
  type?: string;

  // Anchor
  download?: any;
  href?: string;
  hrefLang?: string;
  media?: string;
  rel?: string;
  target?: string;

  // Button
  autoFocus?: boolean;
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  value?: string | string[] | number;

  // Any other props for HTMLElements or a React component passed to as=
  [index: string]: any;
}

/**
 * {@docCategory Link}
 */
export interface ILinkProps extends ILinkHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement | LinkBase> {

  /**
   * Whether the link is disabled
   */
  disabled?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * A component that should be used as the root element of the link returned from the Link component.
   */
  as?: string | Component;

  /**
   * Optional keytip for this Link
   */
  keytipProps?: any;
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
