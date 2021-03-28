import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { IDragDropOptions } from '../../../utils/dragdrop'
import { classNamesFunction, EventGroup, Async, IDisposable } from '@uifabric-vue/utilities'
import { DEFAULT_CELL_STYLE_PROPS } from '../DetailsRow/DetailsRow.styles'
import { Icon, FontIcon } from '../../Icon'
import { ColumnActionsMode, IColumn } from '../DetailsList.types'
import {
  IDetailsColumnStyleProps,
  IDetailsColumnProps,
  IDetailsColumnStyles,
  IDetailsColumnRenderTooltipProps,
} from './DetailsColumn.types'
import { h } from '@vue/composition-api'

const MOUSEDOWN_PRIMARY_BUTTON = 0 // for mouse down event we are using ev.button property, 0 means left button

const getClassNames = classNamesFunction<IDetailsColumnStyleProps, IDetailsColumnStyles>()
const TRANSITION_DURATION_DRAG = 200 // ms
const TRANSITION_DURATION_DROP = 1500 // ms
const CLASSNAME_ADD_INTERVAL = 20 // ms

@Component({
  components: {},
})
export class DetailsColumnBase extends BaseComponent {
  $refs!: {
    root: HTMLDivElement
  }

  @Prop({ type: Object, required: true }) column!: IColumn;
  @Prop({ type: Number, required: true }) columnIndex!: number;
  @Prop({ type: Number, default: null }) parentId!: number
  @Prop({ type: Function, default: null }) onColumnClick!: (ev: MouseEvent, column: IColumn) => void;
  @Prop({ type: Function, default: null }) onColumnContextMenu!: (column: IColumn, ev: MouseEvent) => void;
  @Prop({ type: Object, default: null }) dragDropHelper!: any | null;
  @Prop({ type: Boolean, default: false }) isDraggable!: boolean
  @Prop({ type: Function, default: null }) updateDragInfo!: (props: { itemIndex: number }, event?: MouseEvent) => void;
  @Prop({ type: Boolean, default: false }) isDropped!: boolean;
  @Prop({ type: Object, default: () => DEFAULT_CELL_STYLE_PROPS }) cellStyleProps!: any
  @Prop({ type: Boolean, default: true }) useFastIcons!: boolean;

  private _dragDropSubscription!: IDisposable;

  ColumnActionsMode = ColumnActionsMode

  get IconComponent () {
    return this.useFastIcons ? FontIcon : Icon
  }

  get classNames () {
    const {
      column,
      columnIndex,
      styles,
      theme,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    } = this

    return getClassNames(styles, {
      theme: theme!,
      headerClassName: column.headerClassName,
      iconClassName: column.iconClassName,
      isActionable: column.columnActionsMode !== ColumnActionsMode.disabled,
      isEmpty: !column.name,
      isIconVisible: column.isSorted || column.isGrouped || column.isFiltered,
      isPadded: column.isPadded,
      isIconOnly: column.isIconOnly,
      cellStyleProps,
      transitionDurationDrag: TRANSITION_DURATION_DRAG,
      transitionDurationDrop: TRANSITION_DURATION_DROP,
    })
  }

  get columnWidth () {
    const { column, cellStyleProps } = this

    return column.calculatedWidth! +
      cellStyleProps.cellLeftPadding +
      cellStyleProps.cellRightPadding +
      (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0) +
      'px'
  }

  mounted () {
    if (this.dragDropHelper && this.isDraggable) {
      this._addDragDropHandling()
    }

    const classNames = this.classNames

    if (this.isDropped) {
      if (this.$refs.root) {
        this.$refs.root.classList.add(classNames.borderAfterDropping)

        this._async.setTimeout(() => {
          if (this.$refs.root) {
            this.$refs.root.classList.add(classNames.noBorderAfterDropping)
          }
        }, CLASSNAME_ADD_INTERVAL)
      }

      this._async.setTimeout(() => {
        if (this.$refs.root) {
          this.$refs.root.classList.remove(classNames.borderAfterDropping)
          this.$refs.root.classList.remove(classNames.noBorderAfterDropping)
        }
      }, TRANSITION_DURATION_DROP + CLASSNAME_ADD_INTERVAL)
    }
  }

  beforeDestroy () {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose()
      // @ts-ignore
      delete this._dragDropSubscription
    }
    this._async.dispose()
    this.events.dispose()
  }

  updated () {
    if (!this._dragDropSubscription && this.dragDropHelper && this.isDraggable) {
      this._addDragDropHandling()
    }

    if (this._dragDropSubscription && !this.isDraggable) {
      this._dragDropSubscription.dispose()
      this.events.off(this.$refs.root, 'mousedown')
      // @ts-ignore
      delete this._dragDropSubscription
    }
  }

  _onColumnClick (ev: MouseEvent): void {
    const { onColumnClick, column } = this

    if (column.columnActionsMode === ColumnActionsMode.disabled) {
      return
    }

    if (column.onColumnClick) {
      column.onColumnClick(ev, column)
    }

    if (onColumnClick) {
      onColumnClick(ev, column)
    }
  }

  private _getColumnDragDropOptions (): IDragDropOptions {
    const { columnIndex } = this
    const options = {
      selectionIndex: columnIndex,
      context: { data: columnIndex, index: columnIndex },
      canDrag: () => this.isDraggable!,
      canDrop: () => false,
      onDragStart: this._onDragStart,
      updateDropState: () => undefined,
      onDrop: () => undefined,
      onDragEnd: this._onDragEnd,
    }
    return options
  }

  private _onDragStart (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void {
    const classNames = this.classNames
    if (itemIndex) {
      this._updateHeaderDragInfo(itemIndex)
      this.$refs.root!.classList.add(classNames.borderWhileDragging)
      this._async.setTimeout(() => {
        if (this.$refs.root) {
          this.$refs.root.classList.add(classNames.noBorderWhileDragging)
        }
      }, CLASSNAME_ADD_INTERVAL)
    }
  };

  private _onDragEnd (item?: any, event?: MouseEvent): void {
    const classNames = this.classNames
    if (event) {
      this._updateHeaderDragInfo(-1, event)
    }
    this.$refs.root!.classList.remove(classNames.borderWhileDragging)
    this.$refs.root!.classList.remove(classNames.noBorderWhileDragging)
  };

  private _updateHeaderDragInfo (itemIndex: number, event?: MouseEvent) {
    if (this.updateDragInfo) {
      this.updateDragInfo({ itemIndex }, event)
    }
  };

  private _onRootMouseDown (ev: MouseEvent): void {
    const { isDraggable } = this
    // Ignore anything except the primary button.
    if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
      ev.stopPropagation()
    }
  };

  private _onColumnContextMenu (ev: MouseEvent): void {
    const { onColumnContextMenu, column } = this
    if (column.onColumnContextMenu) {
      column.onColumnContextMenu(column, ev)
      ev.preventDefault()
    }
    if (onColumnContextMenu) {
      onColumnContextMenu(column, ev)
      ev.preventDefault()
    }
  };

  private _addDragDropHandling () {
    this._dragDropSubscription = this.dragDropHelper!.subscribe(this.$refs.root!, this.events, this._getColumnDragDropOptions())

    // We need to use native on this to prevent MarqueeSelection from handling the event before us.
    this.events.on(this.$refs.root, 'mousedown', this._onRootMouseDown)
  }

  render () {
    const { classNames, column, columnIndex, columnWidth, IconComponent, isDraggable, parentId } = this

    return h('div', {
      ref: 'root',
      key: column.key,
      class: classNames.root,
      style: { width: columnWidth },
      attrs: {
        ariaSort: column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none',
        ariaColindex: columnIndex,
        role: 'columnheader',
      },
    }, [
      isDraggable && h(IconComponent, {
        class: classNames.gripperBarVerticalStyle,
        attrs: {
          iconName: 'GripperBarVertical',
        },
      }),
      h('span', { class: classNames.cellTooltip }, [
        h('span', {
          class: classNames.cellTitle,
          attrs: {
            id: `${parentId}-${column.key}`,
            ariaLabel: column.isIconOnly ? column.name : undefined,
            ariaLabelledby: column.isIconOnly ? undefined : `${parentId}-${column.key}-name`,
          },
          on: {
            contextmenu: this._onColumnContextMenu,
            click: this._onColumnClick,
          },
        }, [
          h('span', {
            class: classNames.cellName,
            attrs: { id: `${parentId}-${column.key}-name` },
          }, [
            (column.iconName || column.iconClassName) && h(IconComponent, {
              class: classNames.iconClassName,
              attrs: { iconName: column.iconName },
            }),
            column.isIconOnly
              ? h('span', { class: classNames.accessibleLabel }, column.name)
              : column.name,
          ]),

          column.isFiltered && h(IconComponent, {
            class: classNames.nearIcon,
            attrs: { iconName: 'Filter' },
          }),
          column.isSorted && h(IconComponent, {
            class: classNames.sortIcon,
            attrs: { iconName: column.isSortedDescending ? 'SortDown' : 'SortUp' },
          }),
          column.isGrouped && h(IconComponent, {
            class: classNames.nearIcon,
            attrs: { iconName: 'GroupedDescending' },
          }),
          column.columnActionsMode === ColumnActionsMode.hasDropdown && !column.isIconOnly && h(IconComponent, {
            attrs: {
              iconName: 'ChevronDown',
            },
          }),
        ]),
      ]),
    ])
  }
}
