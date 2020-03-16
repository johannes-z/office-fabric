import { IColumn } from '../DetailsList.types'
import { ITheme } from '@uifabric/styling'
import { IStyleFunctionOrObject, IStyle } from '@uifabric/merge-styles'
import { ITooltipHostProps } from '../../Tooltip/TooltipHost.types'

/**
 * {@docgategory DetailsList}
 */
export interface IDetailsColumnRenderTooltipProps extends ITooltipHostProps {
  /**
   * Information about the column for which the tooltip is being rendered.
   * Use this to format status information about the column, such as its filter or sort state.
   */
  column?: IColumn;
}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsColumnProps {
  /**
   * The theme object to respect during render.
   */
  theme?: ITheme;
  /**
   * The component styles to respect during render.
   */
  styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
  /**
   * A reference to the component instance.
   */
  componentRef?: () => void;
  /**
   * The column definition for the component instance.
   */
  column: IColumn;
  /**
   * The column index for the component instance.
   */
  columnIndex: number;
  /**
   * Parent ID used for accessibility label(s).
   */
  parentId?: string;
  /**
   * Render function for providing a column header tooltip.
   */
  onRenderColumnHeaderTooltip?: any;
  /**
   * Callback fired when click event occurs.
   */
  onColumnClick?: (ev: MouseEvent, column: IColumn) => void;
  /**
   * Callback fired on contextual menu event to provide contextual menu UI.
   */
  onColumnContextMenu?: (column: IColumn, ev: MouseEvent) => void;
  /**
   * The drag and drop helper for the component instance.
   */
  dragDropHelper?: any | null;
  /**
   * Whether or not the column can be re-ordered via drag and drop.
   */
  isDraggable?: boolean;
  /**
   * @deprecated use `updateDragInfo`
   */
  setDraggedItemIndex?: (itemIndex: number) => void;
  /**
   * Callback on drag and drop event.
   */
  updateDragInfo?: (props: { itemIndex: number }, event?: MouseEvent) => void;
  /**
   * Whether or not the column has been dropped via drag and drop.
   */
  isDropped?: boolean;
  /**
   * Custom styles for cell rendering.
   */
  cellStyleProps?: any;
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
export type IDetailsColumnStyleProps = Required<Pick<IDetailsColumnProps, 'theme' | 'cellStyleProps'>> & {
  /**
   * Classname to provide for header region.
   */
  headerClassName?: string;
  /**
   * Whether or not the column is actionable.
   */
  isActionable?: boolean;
  /**
   * Whether or not the column contains contents.
   */
  isEmpty?: boolean;
  /**
   * Whether or not the column has a visible icon.
   */
  isIconVisible?: boolean;
  /**
   * Whether or not the column is padded.
   */
  isPadded?: boolean;
  /**
   * Whether or not the column has icon only content/
   */
  isIconOnly?: boolean;
  /**
   * Classname to provide for the header's icon region.
   */
  iconClassName?: string;
  /**
   * CSS transition duration on drag event.
   */
  transitionDurationDrag?: number;
  /**
   * CSS transition duration on drop event.
   */
  transitionDurationDrop?: number;
};

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsColumnStyles {
  /**
   * Styleable root region.
   */
  root: IStyle;
  /**
   * Styleable resize glyph region.
   */
  gripperBarVerticalStyle: IStyle;
  /**
   * Styleable cell tooltip region.
   */
  cellTooltip: IStyle;
  /**
   * Styleable cell title region.
   */
  cellTitle: IStyle;
  /**
   * Styleable cell name region.
   */
  cellName: IStyle;
  /**
   * Styleable icon region.
   */
  iconClassName: IStyle;
  /**
   * Styleable margin by icon region.
   */
  nearIcon: IStyle;
  /**
   * Styleable label region.
   */
  accessibleLabel: IStyle;
  /**
   * Styleable column sort icon region.
   */
  sortIcon: IStyle;
  /**
   * Styleable filter glyph.
   */
  filterChevron: IStyle;
  /**
   * Styleable border region after drag & drop.
   */
  borderAfterDropping: IStyle;
  /**
   * Transparent no border region after drag & drop to avoid content shift.
   */
  noBorderAfterDropping: IStyle;
  /**
   * Styleable border while drag & drop occurs.
   */
  borderWhileDragging: IStyle;
  /**
   * Transparent no border region while drag & drop occurs to avoid content shift.
   */
  noBorderWhileDragging: IStyle;
}
