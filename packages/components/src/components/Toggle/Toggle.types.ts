import type { ITheme } from '@fluentui-vue/theme'
import type { IStyle, IStyleFunctionOrObject } from '@fluentui/merge-styles'

/**
 * {@docCategory Toggle}
 */
export interface IToggle {
  focus: () => void
}

/**
 * Toggle component props.
 * {@docCategory Toggle}
 */
export interface IToggleProps {
  /**
   * Render the root element as another type.
   */
  as?: string

  /**
   * A label for the toggle.
   */
  label?: string | JSX.Element

  /**
   * Text to display when toggle is ON.
   * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
   */
  onText?: string

  /**
   * Text to display when toggle is OFF.
   * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
   */
  offText?: string

  /**
   * Value of the toggle.
   */
  modelValue?: boolean

  /**
   * Callback issued when the value changes.
   */
  'onUpdate:modelValue'?: (checked?: boolean) => void

  /**
   * Callback issued when the value changes.
   */
  'onChange'?: (event: PointerEvent, checked?: boolean) => void

  /**
   * Optional disabled flag.
   */
  disabled?: boolean

  /**
   * Whether the label (not the onText/offText) should be positioned inline with the toggle control.
   * Left (right in RTL) side when on/off text provided VS right (left in RTL) side when no on/off text.
   * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
   */
  inlineLabel?: boolean

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<IToggleStyleProps, IToggleStyles>
}

/**
 * Properties required to build the styles for the Toggle component.
 * {@docCategory Toggle}
 */
export interface IToggleStyleProps {
  /**
   * Theme values.
   */
  theme: ITheme

  /**
   * Root element class name.
   */
  className?: string

  /**
   * Component is disabled.
   */
  disabled?: boolean

  /**
   * Component is checked.
   */
  checked?: boolean

  /**
   * Whether label should be positioned inline with the toggle.
   */
  inlineLabel?: boolean

  /**
   * Whether the user did not specify a on/off text. Influencing only when inlineLabel is used.
   */
  onOffMissing?: boolean
}

/**
 * Styles for the Toggle component.
 * {@docCategory Toggle}
 */
export interface IToggleStyles {
  /** Root element. */
  root: IStyle

  /**
   * Label element above the toggle.
   */
  label: IStyle

  /**
   * Container for the toggle pill and the text next to it.
   */
  container: IStyle

  /**
   * Pill, rendered as a button.
   */
  pill: IStyle

  /**
   * Thumb inside of the pill.
   */
  thumb: IStyle

  /**
   * Text next to the pill.
   */
  text: IStyle
}
