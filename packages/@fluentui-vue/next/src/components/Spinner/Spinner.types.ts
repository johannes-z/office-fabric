import { IStyle } from '@fluentui/merge-styles'

/**
 * Possible locations of the label in regards to the spinner
 * @defaultvalue bottom
 * {@docCategory Spinner}
 */
export type SpinnerLabelPosition = 'top' | 'right' | 'bottom' | 'left';

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
  /** Size of the spinner animation. */
  size?: number;

  /** CSS class name for the component attached to the root stylable area. */
  className?: string | string[];

  /** Position of the label in regards to the spinner animation. */
  labelPosition?: SpinnerLabelPosition;
}
