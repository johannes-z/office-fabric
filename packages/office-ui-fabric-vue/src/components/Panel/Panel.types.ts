import { IStyle } from '@uifabric/merge-styles'

export interface IPanelProps {

}

export interface IPanelStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the overlay element.
   */
  overlay?: IStyle;

  /**
   * Style for the hidden element.
   */
  hiddenPanel?: IStyle;

  /**
   * Style for the main section element.
   */
  main?: IStyle;

  /**
   * Style for the navigation container element.
   */
  commands?: IStyle;

  /**
   * Style for the Body and Footer container element.
   */
  contentInner?: IStyle;

  /**
   * Style for the scrollable content area container element.
   */
  scrollableContent?: IStyle;

  /**
   * Style for the close button container element.
   */
  navigation?: IStyle;

  /**
   * Style for the close button IconButton element.
   */
  closeButton?: IStyle;

  /**
   * Style for the header container div element.
   */
  header?: IStyle;

  /**
   * Style for the header inner p element.
   */
  headerText?: IStyle;

  /**
   * Style for the body div element.
   */
  content?: IStyle;

  /**
   * Style for the footer div element.
   */
  footer?: IStyle;

  /**
   * Style for the inner footer div element.
   */
  footerInner?: IStyle;
}
