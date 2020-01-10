import { IStyle } from '@uifabric/merge-styles'

export interface IMessageBarStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the element containing the icon, text, and optional dismiss button.
   */
  content?: IStyle;

  /**
   * Style set for the element containing the icon.
   */
  iconContainer?: IStyle;

  /**
   * Style set for the icon.
   */
  icon?: IStyle;

  /**
   * Style set for the element containing the text.
   */
  text?: IStyle;

  /**
   * Style set for the text.
   */
  innerText?: IStyle;

  /**
   * Style set for the optional dismiss button.
   */
  dismissal?: IStyle;

  /**
   * Style set for the icon used to expand and collapse the MessageBar.
   */
  expand?: IStyle;

  /**
   * Style set for the element containing the dismiss button.
   */
  dismissSingleLine?: IStyle;

  /**
   * Style set for the element containing the expand icon.
   */
  expandSingleLine?: IStyle;

  /**
   * Style set for the optional element containing the action elements.
   */
  actions?: IStyle;
}

export enum MessageBarType {
  /** Info styled MessageBar */
  info = 0,
  /** Error styled MessageBar */
  error = 1,
  /** Blocked styled MessageBar */
  blocked = 2,
  /** SevereWarning styled MessageBar */
  severeWarning = 3,
  /** Success styled MessageBar */
  success = 4,
  /** Warning styled MessageBar */
  warning = 5,
  /**
   * Deprecated at v0.48.0, to be removed at \>= v1.0.0. Use `blocked` instead.
   * @deprecated Use `blocked` instead.
   */
  remove = 90000
}
