import { IStyle } from '@uifabric/merge-styles'
import { ITheme } from '@uifabric/styling'

export interface IToggleProps {

}

export interface IToggleStyles {
  root?: IStyle
  label?: IStyle
  container?: IStyle
  pill?: IStyle
  thumb?: IStyle
  text?: IStyle
}

/**
 * Properties required to build the styles for the Toggle component.
 * {@docCategory Toggle}
 */
export interface IToggleStyleProps {
  /**
   * Theme values.
   */
  theme: ITheme;

  /**
   * Root element class name.
   */
  className?: string;

  /**
   * Component is disabled.
   */
  disabled?: boolean;

  /**
   * Component is checked.
   */
  checked?: boolean;

  /**
   * Whether label should be positioned inline with the toggle.
   */
  inlineLabel?: boolean;

  /**
   * Whether the user did not specify a on/off text. Influencing only when inlineLabel is used.
   */
  onOffMissing?: boolean;
}
