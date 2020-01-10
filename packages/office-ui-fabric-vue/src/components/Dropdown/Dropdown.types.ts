import { IStyle } from '@uifabric/merge-styles'

/**
 * Represents the stylable areas of the control.
 * {@docCategory Dropdown}
 */
export interface IDropdownStyles {
  /** Root element of the Dropdown (includes Label and the actual Dropdown). */
  root: IStyle;

  /** Refers to the label associated with the dropdown. This is enclosed by the root. */
  label: IStyle;

  /** Refers to the actual Dropdown element. */
  dropdown: IStyle;

  /** Refers to the primary title of the Dropdown (rendering the selected options/placeholder/etc.). */
  title: IStyle;

  /** Refers to the wrapping container around the downward pointing caret users click on to expand the Dropdown. */
  caretDownWrapper: IStyle;

  /** Refers to the downward pointing caret icon users click on to expand the Dropdown. */
  caretDown: IStyle;

  /** Refers to the error message being rendered under the Dropdown (if any). */
  errorMessage: IStyle;

  /** Refers to the element that wraps `dropdownItems`. */
  dropdownItemsWrapper: IStyle;

  /** Refers to the FocusZone wrapping the individual dropdown items. */
  dropdownItems: IStyle;

  /** Refers to the individual dropdown item. */
  dropdownItem: IStyle;

  /** Style for a dropdown item when it is being selected. */
  dropdownItemSelected: IStyle;

  /** Style for a dropdown item when it is disabled. */
  dropdownItemDisabled: IStyle;

  /** Style for a dropdown item when it is both selected and disabled. */
  dropdownItemSelectedAndDisabled: IStyle;

  /** Style for a dropdown item when it is hidden */
  dropdownItemHidden: IStyle;

  /**
   * Refers to the text element that renders the actual dropdown item/option text. This would be wrapped by the element
   * referred to by `dropdownItem`.
   */
  dropdownOptionText: IStyle;

  /** Refers to the dropdown separator. */
  dropdownDivider: IStyle;

  /** Refers to the individual dropdown items that are being rendered as a header. */
  dropdownItemHeader: IStyle;

  /**
   * Refers to the panel that hosts the Dropdown options in small viewports.
   * Note: This will be deprecated when Panel supports JS Styling.
   */
  panel: IStyle;

  /** Refers to the callout that hosts Dropdown options in larger viewports. */
  callout: IStyle;

  /** Subcomponent styles. */
  // subComponentStyles: IDropdownSubComponentStyles;
}
