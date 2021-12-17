import { IBaseProps } from '@/types'
import { ITheme } from '@fluentui/style-utilities'
import { IStyle, IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { IButtonProps, IIconProps } from '..'

/**
 * {@docCategory SearchBox}
 */
export interface ISearchBoxEvents {
  /**
   * Callback function for when the typed input for the SearchBox has changed.
   */
  input?: (newValue: string) => void;

  /**
   * Callback function for when the typed input for the SearchBox has changed.
   */
  change?: (newValue: string) => void;

  /**
   * Callback executed when the user presses enter in the search box.
   */
  search?: (newValue: string) => void;

  /**
   * Callback executed when the user clears the search box by either clicking 'X' or hitting escape.
   */
  clear?: (ev?: MouseEvent) => void;

  /**
   * Callback executed when the user presses escape in the search box.
   */
  escape?: (ev?: KeyboardEvent) => void;
}

/**
 * {@docCategory SearchBox}
 */
export interface ISearchBox {
  /**
   * Sets focus inside the search input box.
   */
  focus(): void;

  /**
   * Returns whether or not the SearchBox has focus
   */
  hasFocus(): boolean;
}

/**
 * {@docCategory SearchBox}
 */
export interface ISearchBoxProps extends IBaseProps {
  /**
   * Optional callback to access the ISearchBox interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  // componentRef?: React.Ref<ISearchBox>;

  /**
   * Placeholder for the search box.
   */
  placeholder?: string;

  /**
   * The value of the text in the SearchBox.
   */
  value?: string;

  /**
   * The default value of the text in the SearchBox, in the case of an uncontrolled component.
   */
  defaultValue?: string;

  /**
   * CSS class to apply to the SearchBox.
   */
  className?: string;

  /**
   * The aria label of the SearchBox for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * The props for the clear button.
   */
  clearButtonProps?: IButtonProps;

  /**
   * The props for the icon.
   */
  iconProps?: Pick<IIconProps, Exclude<keyof IIconProps, 'className'>>;

  /**
   * Whether or not the SearchBox is underlined.
   * @defaultvalue false
   */
  underlined?: boolean;

  /**
   * The role assigned to the root DIV element of the SearchBox, useful for defining a landmark role, such as "search".
   */
  role?: string;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles>;

  /**
   * Whether or not to animate the SearchBox icon on focus.
   * @defaultvalue false
   */
  disableAnimation?: boolean;

  /**
   * Whether or not to make the icon be always visible (it hides by default when the search box is focused).
   * @defaultvalue false
   */
  showIcon?: boolean;

  /**
   * Whether or not the SearchBox is disabled.
   * @defaultvalue false
   */
  disabled?: boolean
}

/**
 * {@docCategory SearchBox}
 */
export interface ISearchBoxStyleProps {
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  hasFocus?: boolean;
  underlined?: boolean;
  hasInput?: boolean;
  disableAnimation?: boolean;
  showIcon?: boolean;
}

/**
 * {@docCategory SearchBox}
 */
export interface ISearchBoxStyles {
  root?: IStyle;
  iconContainer?: IStyle;
  icon?: IStyle;
  field?: IStyle;
  clearButton?: IStyle;
}
