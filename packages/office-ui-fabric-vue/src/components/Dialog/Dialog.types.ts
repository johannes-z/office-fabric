import { ICSSRule, IStyle, IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { ICSSPixelUnitRule } from '@uifabric/merge-styles/lib/IRawStyleBase'
import { ITheme } from '@uifabric/styling'
import { IModalProps } from '../Modal'
import { IDialogContentProps } from './DialogContent.types'

/**
 * {@docCategory Dialog}
 */
export interface IDialog {}

/**
 * {@docCategory Dialog}
 */
export interface IDialogProps {
  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Props to be passed through to Dialog Content
   */
  dialogContentProps?: IDialogContentProps;

  /**
   * A callback function for when the Dialog is dismissed from the close button or light dismiss.
   * Can also be specified separately in content and modal.
   */
  onDismiss?: (ev?: MouseEvent) => any;

  /**
   * Whether the dialog is hidden.
   * @defaultvalue true
   */
  hidden?: boolean;

  /**
   * Props to be passed through to Modal
   */
  modalProps?: IModalProps;

  /**
   * Sets the minimum width of the dialog. It limits the width property to be not
   * smaller than the value specified in min-width.
   */
  minWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the maximum width for the dialog. It limits the width property to be larger
   * than the value specified in max-width.
   */
  maxWidth?: ICSSRule | ICSSPixelUnitRule;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Whether the dialog is hidden.
   * @defaultvalue false
   */
  hidden?: boolean;

  /**
   * Default min-width for the dialog box.
   * @defaultvalue '288px'
   */
  dialogDefaultMinWidth?: string | ICSSRule | ICSSPixelUnitRule;

  /**
   * Default max-width for the dialog box.
   * @defaultvalue '340px'
   */
  dialogDefaultMaxWidth?: string | ICSSRule | ICSSPixelUnitRule;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  main: IStyle;
}
