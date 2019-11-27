import { IStyle } from '../BaseComponent'

export interface ITextFieldProps {

}

export interface ITextFieldStyles {
  /**
   * Style for root element.
   */
  root: IStyle;

  /**
   * Style for the label of the component.
   */
  label: IStyle;

  /**
   * Style for field group encompassing entry area (prefix, field, icon and suffix).
   */
  fieldGroup: IStyle;

  /**
   * Style for prefix element.
   */
  prefix: IStyle;

  /**
   * Style for suffix element.
   */
  suffix: IStyle;

  /**
   * Style for main field entry element.
   */
  field: IStyle;

  /**
   * Style for icon prop element.
   */
  icon: IStyle;

  /**
   * Style for description element.
   */
  description: IStyle;

  /**
   * Style for TextField wrapper element.
   */
  wrapper: IStyle;

  /**
   * Style for error message element.
   */
  errorMessage: IStyle;

}
