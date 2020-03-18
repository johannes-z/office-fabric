import { IStyle, ITheme } from '@uifabric/styling'
import { IStyleFunctionOrObject } from '@uifabric/merge-styles'

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsRowCheckProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Style override
   */
  styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;

  /**
   * Is the check part of the header in a DetailsList
   */
  isHeader?: boolean;

  /**
   * Whether or not this check is selected
   */
  selected?: boolean;

  /**
   * Is any selected - also true for isSelectionModal
   */
  anySelected?: boolean;

  /**
   * Can this checkbox be selectable
   */
  canSelect: boolean;

  /**
   * Is this in compact mode?
   */
  compact?: boolean;

  /**
   * Optional className to attach to the slider root element.
   */
  className?: string;

  /**
   * The classname to be passed down to Check component
   */
  checkClassName?: string;

  /**
   * Whether or not this checkbox is visible
   */
  isVisible?: boolean;

  /**
   * Whether to use fast icon and check components. The icons can't be targeted by customization
   * but are still customizable via class names.
   * @defaultvalue true
   */
  useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> &
Pick<IDetailsRowCheckProps, 'compact' | 'isHeader' | 'selected' | 'anySelected' | 'canSelect' | 'className'> & {
  /** Is checkbox visible */
  isVisible?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsRowCheckStyles {
  root: IStyle;
  /** @deprecated Use `root` (they're applied to the same element) */
  check: IStyle;
  isDisabled: IStyle;
}

export interface IDetailsCheckboxProps {
  checked: boolean;
  theme?: ITheme;
}
