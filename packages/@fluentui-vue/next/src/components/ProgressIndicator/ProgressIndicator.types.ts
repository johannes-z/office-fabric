import type { IStyle } from '@fluentui/style-utilities'
import type { IStyleFunctionOrObject } from '@uifabric/merge-styles'
import type { ITheme } from '@uifabric/styling'
import type { VNode } from 'vue'

/**
 * {@docCategory ProgressIndicator}
 */
export interface IProgressIndicatorProps {
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ProgressIndicator
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Label to display above the control. May be a string or React virtual elements.
   */
  label?: string;

  /**
   * Add screen-reader-only label text to the progressbar.
   * Prefer `label`, and use this only when other text or visual context provides a visible label
   */
  ariaLabel?: string;

  /**
   * Text describing or supplementing the operation. May be a string or React virtual elements.
   */
  description?: string;

  /**
   * Percentage of the operation's completeness, numerically between 0 and 1. If this is not set,
   * the indeterminate progress animation will be shown instead.
   */
  percentComplete?: number;

  /**
   * Whether or not to hide the progress state.
   */
  progressHidden?: boolean;

  /**
   * Text alternative of the progress status, used by screen readers for reading the value of the progress.
   */
  ariaValueText?: string;

  /**
   * Height of the ProgressIndicator
   * @defaultvalue 2
   */
  barHeight?: number;
}

/**
 * {@docCategory ProgressIndicator}
 */
export interface IProgressIndicatorStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;
  indeterminate?: boolean;
  barHeight?: number;
}

/**
 * {@docCategory ProgressIndicator}
 */
export interface IProgressIndicatorStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  itemName: IStyle;
  itemDescription: IStyle;
  itemProgress: IStyle;
  progressTrack: IStyle;
  progressBar: IStyle;
}

interface IScopedSlot<P> {
  (props?: P & { defaultRender?: (props?: P) => VNode | VNode[] | null }): VNode | VNode[] | null;
}

/**
 * {@docCategory ProgressIndicator}
 */
export interface IProgressIndicatorSlots {
  label?: () => VNode[]
  description?: () => VNode[]
  progress?: IScopedSlot<IProgressIndicatorProps>
}
