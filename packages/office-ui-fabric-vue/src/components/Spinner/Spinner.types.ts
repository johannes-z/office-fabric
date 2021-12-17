import { IStyle, IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { ITheme } from '@uifabric/styling'

export interface ISpinnerProps {

  /**
   * The size of Spinner to render in px.
   * @defaultvalue 20
   */
  size?: number;

  /**
   * The label to show next to the Spinner. Label updates will be announced to the screen readers.
   * Use ariaLive to control politeness level.
   */
  label?: string;

  /**
   * Additional CSS class(es) to apply to the Spinner.
   */
  className?: string;

  /**
   * Politeness setting for label update announcement.
   * @defaultvalue polite
   */
  ariaLive?: 'assertive' | 'polite' | 'off';

  /**
   * Alternative status label for screen reader
   */
  ariaLabel?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>;

  /**
   * The position of the label in regards of the spinner animation.
   * @defaultvalue SpinnerLabelPosition.bottom
   */
  labelPosition?: SpinnerLabelPosition;
}

/**
 * Possible variations of the spinner circle size.
 * {@docCategory Spinner}
 */
export enum SpinnerSize {
  /**
   * 12px Spinner diameter
   */
  xSmall = 0,

  /**
   * 16px Spinner diameter
   */
  small = 1,

  /**
   * 20px Spinner diameter
   */
  medium = 2,

  /**
   * 28px Spinner diameter
   */
  large = 3,
}

export interface ISpinnerStyles {
  /** Styles for the root element. Refers to the wrapper containing both the
   * circle and the label. */
  root?: IStyle;

  /** Styles for the spinner circle animation. */
  circle?: IStyle;

  /** Styles for the label accompanying the circle. */
  label?: IStyle;

  /** Styles for the hidden helper element to aid with screen readers. */
  screenReaderText?: IStyle;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Spinner}
 */
export interface ISpinnerStyleProps {
  /** Theme provided by High-Order Component. */
  theme: ITheme;

  /** Size of the spinner animation. */
  size?: number;

  /** CSS class name for the component attached to the root stylable area. */
  className?: string;

  /** Position of the label in regards to the spinner animation. */
  labelPosition?: SpinnerLabelPosition;
}

/**
 * Possible locations of the label in regards to the spinner
 * @defaultvalue bottom
 * {@docCategory Spinner}
 */
export type SpinnerLabelPosition = 'top' | 'right' | 'bottom' | 'left';
