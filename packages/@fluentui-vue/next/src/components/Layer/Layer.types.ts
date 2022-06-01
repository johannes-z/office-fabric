import { IStyle } from '@fluentui/merge-styles'

/**
 * {@docCategory Layer}
 */
export interface ILayerStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Check if Host
   */
  isNotHost?: boolean;
}

/**
 * {@docCategory Layer}
 */
export interface ILayerStyles {
  /**
   * Style for the root element when fixed.
   */
  root?: IStyle;
  /**
   * Style for the Fabric component.
   */
  content?: IStyle;
}
