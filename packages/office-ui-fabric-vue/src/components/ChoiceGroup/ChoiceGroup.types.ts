import { ITheme } from '@uifabric/styling'
import { IStyleFunctionOrObject, IStyle } from '@uifabric/merge-styles'
import { IIconProps } from '../Icon'
import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption'

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroup {
  /**
   * Gets the current checked option.
   */
  checkedOption: IChoiceGroupOption | undefined;

  /**
   * Sets focus to the checked option or the first enabled option in the ChoiceGroup.
   */
  focus: () => void;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupProps {
  /**
   * The options for the choice group.
   */
  options?: IChoiceGroupOption[];

  /**
   * The key of the option that will be initially checked.
   */
  // TODO (Fabric 8?): defaultSelectedKey/selectedKey allow numbers but IChoiceGroupOption doesn't.
  // This should be consistent one way or the other everywhere.
  defaultSelectedKey?: string | number;

  /**
   * The key of the selected option. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   */
  selectedKey?: string | number;

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChange?: (ev?: any, option?: IChoiceGroupOption) => void;

  /**
   * Descriptive label for the choice group.
   */
  label?: string;

  /**
   * Deprecated and will be removed by 07/17/2017. Use `onChange` instead.
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (option: IChoiceGroupOption, evt?: any) => void;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>;

  /**
   * ID of an element to use as the aria label for this ChoiceGroup.
   */
  ariaLabelledBy?: string;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupStyleProps {
  theme: ITheme;
  className?: string;
  optionsContainIconOrImage?: boolean;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupStyles {
  /**
   * The actual root of the component.
   * @deprecated Styles will be merged with `root` in a future release.
   */
  applicationRole?: IStyle;
  /**
   * Not currently the actual root of the component (will be fixed in a future release).
   * For now, to style the actual root, use `applicationRole`.
   */
  root?: IStyle;
  label?: IStyle;
  flexContainer?: IStyle;
}
