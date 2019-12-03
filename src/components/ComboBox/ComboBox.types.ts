import { IStyle } from '@uifabric/merge-styles'

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxStyles {
  /**
   * Style for the container which has the ComboBox and the label
   */
  container: IStyle;

  /**
   * Style for the label element of the ComboBox.
   */
  label: IStyle;

  /**
   * Style for the label element of the ComboBox in the disabled state.
   */
  labelDisabled: IStyle;

  /**
   * Base styles for the root element of all ComboBoxes.
   */
  root: IStyle;

  /**
   * Styles for the root element for variant of ComboBox with an errorMessage in the props.
   */
  rootError: IStyle;

  /**
   * Styles for variant of ComboBox where allowFreeForm is false in the props.
   */
  rootDisallowFreeForm: IStyle;

  /**
   * Styles for when the ComboBox is hovered. These styles are applied for all comboBoxes except when
   * the comboBox is disabled.
   */
  rootHovered: IStyle;

  /**
   * Styles for when the ComboBox is active. These styles are applied for all comboBoxes except when
   * the comboBox is disabled.
   */
  rootPressed: IStyle;

  /**
   * Styles for when the ComboBox is focused. These styles are applied for all comboBoxes except when
   * the comboBox is disabled.
   */
  rootFocused: IStyle;

  /**
   * Styles for when the comboBox is disabled. These styles override all the other styles.
   * NOTE : Hover (or) Focused (or) active styles are not applied for disabled comboBoxes.
   */
  rootDisabled: IStyle;

  /**
   * Base styles for the input element - which contains the currently selected
   * option.
   */
  input: IStyle;

  /**
   * Style override for the input element when comboBox is disabled.
   */
  inputDisabled: IStyle;

  /**
   * Styles for the error Message text of the comboBox.
   */
  errorMessage: IStyle;

  /**
   * Styles for the callout.
   */
  callout: IStyle;

  /**
   * Styles for the optionsContainerWrapper.
   */
  optionsContainerWrapper: IStyle;

  /**
   * Styles for the container of all the Combobox options
   * Includes the headers and dividers.
   */
  optionsContainer: IStyle;

  /**
   * Styles for a header in the options.
   */
  header: IStyle;

  /**
   * Styles for a divider in the options.
   */
  divider: IStyle;
}
