import { IRectangle } from '@uifabric-vue/utilities'

/**
 * {@docCategory List}
 */
export const ScrollToMode = {
  /**
   * Does not make any consideration to where in the viewport the item should align to.
   */
  auto: 0 as 0,
  /**
   * Attempts to scroll the list so the top of the desired item is aligned with the top of the viewport.
   */
  top: 1 as 1,
  /**
   * Attempts to scroll the list so the bottom of the desired item is aligned with the bottom of the viewport.
   */
  bottom: 2 as 2,
  /**
   * Attempts to scroll the list so the desired item is in the exact center of the viewport.
   */
  center: 3 as 3,
}

/**
 * {@docCategory List}
 */
export type ScrollToMode = typeof ScrollToMode[keyof typeof ScrollToMode];

/**
 * {@docCategory List}
 */
export interface IList {
  /**
   * Force the component to update.
   */
  forceUpdate: () => void;

  /**
   * Get the current height the list and it's pages.
   */
  getTotalListHeight?: () => number;

  /**
   * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
   * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
   *
   * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
   * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
   *
   * @param index - Index of item to scroll to
   * @param measureItem - Optional callback to measure the height of an individual item
   * @param scrollToMode - Optional defines the behavior of the scrolling alignment. Defaults to auto.
   *  Note: The scrollToMode requires the measureItem callback is provided to function.
   */
  scrollToIndex: (index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;

  /**
   * Get the start index of the page that is currently in view
   */
  getStartItemIndexInView: () => number;
}

/**
 * {@docCategory List}
 */
export interface IListProps<T = any> {

  /** Optional classname to append to root list. */
  className?: string;

  /** Items to render. */
  items?: T[];

  /**
   * Method to call when trying to render an item.
   * @param item - The data associated with the cell that is being rendered.
   * @param index - The index of the cell being rendered.
   * @param isScrolling - True if the list is being scrolled. May be useful for rendering a placeholder if your cells are complex.
   */
  onRenderCell?: (item?: T, index?: number, isScrolling?: boolean) => any;

  /**
   * Optional callback invoked when List rendering completed.
   * This can be on initial mount or on re-render due to scrolling.
   * This method will be called as a result of changes in List pages (added or removed),
   * and after ALL the changes complete.
   * To track individual page Add / Remove use onPageAdded / onPageRemoved instead.
   * @param pages - The current array of pages in the List.
   */
  onPagesUpdated?: (pages: IPage<T>[]) => void;

  /** Optional callback for monitoring when a page is added. */
  onPageAdded?: (page: IPage<T>) => void;

  /** Optional callback for monitoring when a page is removed. */
  onPageRemoved?: (page: IPage<T>) => void;

  /** Optional callback to get the item key, to be used on render. */
  getKey?: (item: T, index?: number) => string;

  /**
   * Called by the list to get the specification for a page.
   * Use this method to provide an allocation of items per page,
   * as well as an estimated rendered height for the page.
   * The list will use this to optimize virtualization.
   */
  getPageSpecification?: (itemIndex?: number, visibleRect?: IRectangle) => IPageSpecification;

  /**
   * Method called by the list to get how many items to render per page from specified index.
   * In general, use `getPageSpecification` instead.
   */
  getItemCountForPage?: (itemIndex?: number, visibleRect?: IRectangle) => number;

  /**
   * Method called by the list to get the pixel height for a given page. By default, we measure the first
   * page's height and default all other pages to that height when calculating the surface space. It is
   * ideal to be able to adequately predict page heights in order to keep the surface space from jumping
   * in pixels, which has been seen to cause browser performance issues.
   * In general, use `getPageSpecification` instead.
   */
  getPageHeight?: (itemIndex?: number, visibleRect?: IRectangle, itemCount?: number) => number;

  /**
   * Method called by the list to derive the page style object. For spacer pages, the list will derive
   * the height and passed in heights will be ignored.
   */
  getPageStyle?: (page: IPage<T>) => any;

  /**
   * In addition to the visible window, how many windowHeights should we render ahead.
   * @defaultvalue 2
   */
  renderedWindowsAhead?: number;

  /**
   * In addition to the visible window, how many windowHeights should we render behind.
   * @defaultvalue 2
   */
  renderedWindowsBehind?: number;

  /** Index in items array to start rendering from. Defaults to 0. */
  startIndex?: number;

  /** Number of items to render. Defaults to items.length. */
  renderCount?: number;

  /**
   * Boolean value to enable render page caching. This is an experimental performance optimization
   * that is off by default.
   * @defaultvalue false
   */
  usePageCache?: boolean;

  /**
   * Optional callback to determine whether the list should be rendered in full, or virtualized.
   * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
   * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
   * The default implementation will virtualize when this callback is not provided.
   */
  onShouldVirtualize?: (props: IListProps<T>) => boolean;

  /**
   * The role to assign to the list root element.
   * Use this to override the default assignment of 'list' to the root and 'listitem' to the cells.
   */
  role?: string;

  /**
   * Called when the List will render a page.
   * Override this to control how cells are rendered within a page.
   */
  onRenderPage?: (pageProps: IPageProps<T>, defaultRender?: any) => any;

  /**
   * An object which can be passed in as a fresh instance to 'force update' the list.
   */
  version?: {};

  /**
   * Boolean value to disable scroll state updates. This will cause the isScrolling argument in onRenderCell to always be undefined.
   * This is a performance optimization to let List skip a render cycle by not updating its scrolling state.
   */
  ignoreScrollingState?: boolean;
}

/**
 * {@docCategory List}
 */
export interface IPage<T = any> {
  key: string;
  items: T[] | undefined;
  startIndex: number;
  itemCount: number;
  style: any;
  top: number;
  height: number;
  data?: any;
  isSpacer?: boolean;
  isVisible?: boolean;
}

/**
 * {@docCategory List}
 */
export interface IPageProps<T = any> {
  /**
   * The role being assigned to the rendered page element by the list.
   */
  role?: string;
  /**
   * The allocation data for the page.
   */
  page: IPage<T>;
}

/**
 * {@docCategory List}
 */
export interface IPageSpecification {
  /**
   * The number of items to allocate to the page.
   */
  itemCount?: number;
  /**
   * The estimated pixel height of the page.
   */
  height?: number;
  /**
   * Data to pass through to the page when rendering.
   */
  data?: any;
  /**
   * The key to use when creating the page.
   */
  key?: string;
}
