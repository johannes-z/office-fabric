import { IStyle } from '@uifabric/merge-styles'

export interface ILabelProps {
  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  required?: boolean;

  /**
   * Renders the label as disabled.
   */
  disabled?: boolean;
}

export interface ILabelStyles {
  /**
   * Styles for the root element.
   */
  root: IStyle;
}
