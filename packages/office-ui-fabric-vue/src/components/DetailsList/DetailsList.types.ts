import { IStyleFunctionOrObject } from '@uifabric/merge-styles'

/**
 * {@docCategory DetailsList}
 */
export interface IColumn {
  /**
   * A unique key for identifying the column.
   */
  key: string;

  /**
   * Name to render on the column header.
   */
  name: string;

  /**
   * The field to pull the text value from for the column. This can be null if a custom
   * onRender method is provided.
   */
  fieldName?: string;

  /**
   * An optional class name to stick on the column cell within each row.
   */
  className?: string;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<any, any>;

  /**
   * Minimum width for the column.
   */
  minWidth: number;

  /**
   * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
   * If none is specified, the arai-label attribute will contain the column name
   */
  ariaLabel?: string;

  /**
   * Optional flag on whether the column is a header for the given row. There should be only one column with
   * row header set to true.
   * @defaultvalue false
   */
  isRowHeader?: boolean;

  /**
   * Maximum width for the column, if stretching is allowed in justified scenarios.
   */
  maxWidth?: number;

  /**
   * Defines how the column's header should render.
   * @defaultvalue ColumnActionsMode.clickable
   */
  columnActionsMode?: any;

  /**
   * Optional iconName to use for the column header.
   */
  iconName?: string;

  /**
   * Whether or not only the icon is used in the column header.
   * Set this to true so the column name and dropdown chevron are not displayed.
   */
  isIconOnly?: boolean;

  /**
   * Class name to add to the Icon component.
   */
  iconClassName?: string;

  /**
   * If specified will allow the column to be collapsed when rendered in justified layout.
   */
  isCollapsible?: boolean;

  /**
   * Determines if the column is currently sorted. Renders a sort arrow in the column header.
   */
  isSorted?: boolean;

  /**
   * Determines if the arrow is pointed down (descending) or up.
   */
  isSortedDescending?: boolean;

  /**
   * Determines if the column can be resized.
   */
  isResizable?: boolean;

  /**
   * Determines if the column can render multi-line text.
   */
  isMultiline?: boolean;

  /**
   * If provided uses this method to render custom cell content, rather than the default text rendering.
   */
  onRender?: (item?: any, index?: number, column?: IColumn) => any;

  /**
   * If set, parent getCellValueKey will return this value.
   */
  getValueKey?: (item?: any, index?: number, column?: IColumn) => string;

  /**
   * Determines if the column is filtered, and if so shows a filter icon.
   */
  isFiltered?: boolean;

  /**
   * If provided, will be executed when the user clicks on the column header.
   */
  onColumnClick?: (ev: MouseEvent, column: IColumn) => void;

  /**
   * If provided, will be executed when the user accesses the contextmenu on a column header.
   */
  onColumnContextMenu?: (column?: IColumn, ev?: MouseEvent) => void;

  /**
   * If provided, will be executed when the column is resized with the column's current width.
   * Prefer this callback over `DetailsList` `onColumnResize` if you require the `IColumn` to
   * report its width after every resize event. Consider debouncing the callback if resize events
   * occur frequently.
   */
  onColumnResize?: (width?: number) => void;

  /**
   * If set will show a grouped icon next to the column header name.
   */
  isGrouped?: boolean;

  /**
   * Arbitrary data passthrough which can be used by the caller.
   */
  data?: any;

  /**
   * Internal only value.
   */
  calculatedWidth?: number;

  /**
   * Internal only value.
   * Remembers the actual witdh of the column on any case.
   * On the other hand, calculatedWidth is only saved when it's defined by user, not for justified calculations.
   */
  currentWidth?: number;

  /**
   * An optional class name to stick on the column cell within each header.
   */
  headerClassName?: string;

  /**
   * If set, will add additional LTR padding-right to column and cells.
   */
  isPadded?: boolean;

  /**
   * ARIA label for the sort order of this column when sorted ascending.
   */
  sortAscendingAriaLabel?: string;
  /**
   * ARIA label for the sort order of this column when sorted descending.
   */
  sortDescendingAriaLabel?: string;
  /**
   * ARIA label for the status of this column when grouped.
   */
  groupAriaLabel?: string;
  /**
   * ARIA label for the status of this column when filtered.
   */
  filterAriaLabel?: string;
  /**
   * Indicates whether a dropdown menu is open so that the appropriate ARIA attributes are rendered.
   */
  isMenuOpen?: boolean;
}
