/**
 * {@docCategory Announced}
 */

import type { IStyle, IStyleFunctionOrObject } from '@fluentui/merge-styles'

export interface IAnnouncedProps {
  /**
   * The status message the screen reader should announce.
   */
  message?: string;

  /**
   * Priority with which the screen reader should treat updates to this region.
   * @default 'polite'
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';

  as?: string ;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<{}, IAnnouncedStyles>;
}

/**
 * {@docCategory Announced}
 */
export type IAnnouncedStyleProps = {
  className?: string
};

/**
 * {@docCategory Announced}
 */
export interface IAnnouncedStyles {
  /**
   * Style override for the root element.
   */
  root: IStyle;

  /**
   * Style override for the screen reader text.
   */
  screenReaderText: IStyle;
}
