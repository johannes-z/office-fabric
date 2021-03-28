import { IStyleFunctionOrObject, IStyle } from '@uifabric/merge-styles'
import { ITheme } from '@uifabric/styling'
import { IButtonProps } from '../Button/Button.types'
import { ResponsiveMode } from '../../utils'

export { ResponsiveMode } // Exported because the type is an optional prop and not exported otherwise.

/**
 * {@docCategory Dialog}
 */
export interface IDialogContent {}

/**
 * {@docCategory Dialog}
 */
export interface IDialogContentProps {
  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDialogContentStyleProps, IDialogContentStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Is inside a multiline wrapper
   */
  isMultiline?: boolean;

  /**
   * Show an 'x' close button in the upper-right corner
   */
  showCloseButton?: boolean;

  /**
   * Other top buttons that will show up next to the close button
   */
  topButtonsProps?: IButtonProps[];

  /**
   * Optional override class name
   */
  className?: string;

  /**
   * Callback for when the Dialog is dismissed from the close button or light dismiss, before the animation completes.
   */
  onDismiss?: (ev?: MouseEvent) => any;

  /**
   * The Id for subText container
   */
  subTextId?: string;

  /**
   * The subtext to display in the dialog
   */
  subText?: string;

  /**
   * The title text to display at the top of the dialog.
   */
  title?: string | JSX.Element;

  /**
   * The props for title container.
   */
  titleProps?: any;

  /**
   * Responsive mode passed in from decorator.
   */
  responsiveMode?: ResponsiveMode;

  /**
   * Label to be passed to to aria-label of close button
   * @defaultvalue Close
   */
  closeButtonAriaLabel?: string;

  /**
   * The type of Dialog to display.
   * @defaultvalue DialogType.normal
   */
  type?: DialogType;

  /**
   * The classname for when the header is draggable
   */
  draggableHeaderClassName?: string;
}

/**
 * {@docCategory Dialog}
 */
export enum DialogType {
  /** Standard dialog */
  normal = 0,
  /** Dialog with large header banner */
  largeHeader = 1,
  /** Dialog with an 'x' close button in the upper-right corner */
  close = 2,
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogContentStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  isLargeHeader?: boolean;
  isClose?: boolean;
  hidden?: boolean;

  /**
   * Is inside a multiline wrapper
   */
  isMultiline?: boolean;

  /**
   * The classname for when the header is draggable
   */
  draggableHeaderClassName?: string;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogContentStyles {
  /**
   * Style for the content element.
   */
  content: IStyle;
  subText: IStyle;
  header: IStyle;
  button: IStyle;
  inner: IStyle;
  innerContent: IStyle;
  title: IStyle;
  topButton: IStyle;
}
