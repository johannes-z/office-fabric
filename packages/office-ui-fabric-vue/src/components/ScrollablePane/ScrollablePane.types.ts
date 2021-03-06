import { IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { IStyle, ITheme } from '@uifabric/styling'
import ScrollablePane from './ScrollablePane.vue'
import { Sticky } from '../Sticky/'

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePane {
  /** Triggers a layout update for the pane. */
  forceLayoutUpdate(): void;
  /** Gets the current scroll position of the scrollable pane */
  getScrollPosition(): number;
}

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePaneProps {
  // export interface IScrollablePaneProps extends React.Props<ScrollablePaneBase> {
  /**
   * Optional callback to access the IScrollablePane interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: any;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IScrollablePaneStyleProps, IScrollablePaneStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ScrollablePane
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Sets the initial scroll position of the ScrollablePane
   */
  initialScrollPosition?: number;

  scrollbarVisibility?: ScrollbarVisibility;
}

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePaneStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  scrollbarVisibility?: IScrollablePaneProps['scrollbarVisibility'];

  // Insert ScrollablePane style props below
}

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePaneStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
  /**
   * Style set for the stickyAbove element.
   */
  stickyAbove: IStyle;
  /**
   * Style set for the stickyBelow element.
   */
  stickyBelow: IStyle;
  /**
   * Style set for the stickyBelowItems element.
   */
  stickyBelowItems: IStyle;
  /**
   * Style set for the contentContainer element.
   */
  contentContainer: IStyle;
}

/**
 * {@docCategory ScrollablePane}
 */
export const ScrollbarVisibility = {
  auto: 'auto' as 'auto',
  always: 'always' as 'always',
}

/**
 * {@docCategory ScrollablePane}
 */
export type ScrollbarVisibility = typeof ScrollbarVisibility[keyof typeof ScrollbarVisibility];

export interface IScrollablePaneContext {
  scrollablePane?: {
    subscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    unsubscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    addSticky: (sticky: Sticky) => void;
    removeSticky: (sticky: Sticky) => void;
    updateStickyRefHeights: () => void;
    sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
    notifySubscribers: (sort?: boolean) => void;
    syncScrollSticky: (sticky: Sticky) => void;
  };
}
