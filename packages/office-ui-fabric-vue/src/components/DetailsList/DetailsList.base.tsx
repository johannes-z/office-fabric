import { Component, Prop } from 'vue-property-decorator'
import { DetailsHeader } from './DetailsHeader'
import { DetailsRow } from './DetailsRow'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { List } from '../List'
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow/DetailsRow.styles'
import { IColumn, IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types'

const getClassNames = classNamesFunction<IDetailsListStyleProps, IDetailsListStyles>()

@Component
export class DetailsListBase extends BaseComponent {
  $refs!: {
    list: List
  }

  @Prop({ type: Array, required: true }) columns!: any[]
  @Prop({ type: Array, default: () => [] }) items!: any[]
  @Prop({ type: Boolean, default: false }) compact!: boolean

  lastWidth = -1
  lastSelectionMode = undefined

  columnOverrides: any = {}

  lastSortedColumnKey = ''

  render () {
    const { classNames, items, adjustedColumns, compact } = this
    return (
      <div class={classNames.root} data-is-scrollable="false">
        <div role="grid">
          <div class={classNames.headerWrapper}>
            {this.$scopedSlots.DetailsHeader
              ? this.$scopedSlots.DetailsHeader({ defaultRender: this.onRenderDetailsHeader })
              : this.onRenderDetailsHeader()}
          </div>

          <div class={classNames.contentWrapper}>
            <List ref="list"
              items={items}
              role="presentation"
              {...{
                scopedSlots: {
                  item: ({ item }) => (
                    <DetailsRow
                      item={item}
                      columns={adjustedColumns}
                      compact={compact}
                      {...{ scopedSlots: this.$scopedSlots }} />
                  ),
                },
              }}>
            </List>
          </div>
        </div>
      </div>
    )
  }

  get classNames () {
    const {
      styles,
      theme,
      className,
      compact,
    } = this
    return getClassNames(styles, {
      theme: theme!,
      compact,
      isFixed: false,
      isHorizontalConstrained: false,
      className,
    })
  }

  get adjustedColumns (): IColumn[] {
    return this._adjustColumns(this.$props)
  }

  private onRenderDetailsHeader () {
    return (<DetailsHeader columns={this.adjustedColumns} />)
  }

  created () {
    const DEFAULT_COLUMN = {
      key: '',
      name: '',
      fieldName: '',
      className: '',
      styles: null,
      minWidth: 0,
      ariaLabel: '',
      isRowHeader: false,
      maxWidth: 0,
      columnActionsMode: 1,
      iconName: '',
      isIconOnly: false,
      iconClassName: '',
      isCollapsible: false,
      isSorted: false,
      isSortedDescending: false,
      isResizable: false,
      isMultiline: false,
      onRender: null,
      getValueKey: null,
      isFiltered: false,
      onColumnClick: null,
      onColumnContextMenu: null,
      onColumnResize: null,
      isGrouped: false,
      data: {},
      calculatedWidth: 0,
      currentWidth: 0,
      headerClassName: '',
      isPadded: false,
      sortAscendingAriaLabel: '',
      sortDescendingAriaLabel: '',
      groupAriaLabel: '',
      filterAriaLabel: '',
      isMenuOpen: false,
    }

    for (const key in DEFAULT_COLUMN) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_COLUMN, key)) {
        // @ts-ignore
        const value = DEFAULT_COLUMN[key]
        this.columns.forEach((col: IColumn) => {
          // @ts-ignore
          this.$set(col, key, col[key] !== undefined ? col[key] : value)
        })
      }
    }
  }

  private _rememberCalculatedWidth (column: any, newCalculatedWidth: number): void {
    const overrides = this._getColumnOverride(column.key)
    overrides.calculatedWidth = newCalculatedWidth
    overrides.currentWidth = newCalculatedWidth
  }

  private _getColumnOverride (key: string): any {
    return (this.columnOverrides[key] = this.columnOverrides[key] || {})
  }

  private _adjustColumns (newProps: any, forceUpdate?: boolean, resizingColumnIndex?: number): IColumn[] {
    const adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, resizingColumnIndex)
    // const { viewport } = this
    const viewportWidth = 1000

    if (adjustedColumns) {
      // this.adjustedColumns = adjustedColumns
      this.lastWidth = viewportWidth
    }
    return adjustedColumns
  }

  /** Returns adjusted columns, given the viewport size and layout mode. */
  private _getAdjustedColumns (newProps: any, forceUpdate?: boolean, resizingColumnIndex?: number): any[] {
    const { items: newItems, layoutMode, selectionMode, viewport } = newProps
    const viewportWidth = viewport && viewport.width ? viewport.width : 0
    let { columns: newColumns } = newProps

    const columns = this ? this.columns : []
    const lastWidth = this ? this.lastWidth : -1
    const lastSelectionMode = this ? this.lastSelectionMode : undefined

    if (!forceUpdate && lastWidth === viewportWidth && lastSelectionMode === selectionMode && (!columns || newColumns === columns)) {
      return []
    }

    newColumns = newColumns || buildColumns(newItems, true)

    let adjustedColumns: any[]

    if (layoutMode !== 0) {
      adjustedColumns = this._getFixedColumns(newColumns)

      // Preserve adjusted column calculated widths.
      adjustedColumns.forEach(column => {
        this._rememberCalculatedWidth(column, column.calculatedWidth!)
      })
    } else {
      if (resizingColumnIndex !== undefined) {
        adjustedColumns = this._getJustifiedColumnsAfterResize(newColumns, viewportWidth, newProps, resizingColumnIndex)
      } else {
        adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps, 0)
      }

      adjustedColumns.forEach(column => {
        this._getColumnOverride(column.key).currentWidth = column.calculatedWidth
      })
    }

    return adjustedColumns
  }

  /** Builds a set of columns based on the given columns mixed with the current overrides. */
  private _getFixedColumns (newColumns: any[]): any[] {
    return newColumns.map(column => {
      const newColumn: any = { ...column, ...this.columnOverrides[column.key] }

      if (!newColumn.calculatedWidth) {
        newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH
      }

      return newColumn
    })
  }

  private _getJustifiedColumnsAfterResize (
    newColumns: any[],
    viewportWidth: number,
    props: any,
    resizingColumnIndex: number,
  ): any[] {
    const fixedColumns = newColumns.slice(0, resizingColumnIndex)
    fixedColumns.forEach(column => (column.calculatedWidth = this._getColumnOverride(column.key).currentWidth))

    const fixedWidth = fixedColumns.reduce((total, column, i) => total + getPaddedWidth(column, i === 0, props), 0)

    const remainingColumns = newColumns.slice(resizingColumnIndex)
    const remainingWidth = viewportWidth - fixedWidth

    return [...fixedColumns, ...this._getJustifiedColumns(remainingColumns, remainingWidth, props, resizingColumnIndex)]
  }

  /** Builds a set of columns to fix within the viewport width. */
  private _getJustifiedColumns (newColumns: any[], viewportWidth: number, props: any, firstIndex: number): any[] {
    const { selectionMode = 0, checkboxVisibility } = props
    const rowCheckWidth = selectionMode !== 0 && checkboxVisibility !== checkboxVisibility.hidden ? 10 : 0
    const groupExpandWidth = 1 * 10
    let totalWidth = 0 // offset because we have one less inner padding.
    const availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth)
    const adjustedColumns: any[] = newColumns.map((column, i) => {
      const newColumn = {
        ...column,
        calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH,
        ...this.columnOverrides[column.key],
      }

      const isFirst = i + firstIndex === 0
      totalWidth += getPaddedWidth(newColumn, isFirst, props)

      return newColumn
    })

    let lastIndex = adjustedColumns.length - 1

    // Shrink or remove collapsable columns.
    while (lastIndex > 0 && totalWidth > availableWidth) {
      const column = adjustedColumns[lastIndex]

      const minWidth = column.minWidth || MIN_COLUMN_WIDTH
      const overflowWidth = totalWidth - availableWidth

      // tslint:disable-next-line:deprecation
      if (column.calculatedWidth! - minWidth >= overflowWidth || !(column.isCollapsible || column.isCollapsable)) {
        const originalWidth = column.calculatedWidth!
        column.calculatedWidth = Math.max(column.calculatedWidth! - overflowWidth, minWidth)
        totalWidth -= originalWidth - column.calculatedWidth
      } else {
        totalWidth -= getPaddedWidth(column, false, props)
        adjustedColumns.splice(lastIndex, 1)
      }
      lastIndex--
    }

    // Then expand columns starting at the beginning, until we've filled the width.
    for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
      const column = adjustedColumns[i]
      const isLast = i === adjustedColumns.length - 1
      const overrides = this.columnOverrides[column.key]
      if (overrides && overrides.calculatedWidth && !isLast) {
        continue
      }

      const spaceLeft = availableWidth - totalWidth
      let increment: number
      if (isLast) {
        increment = spaceLeft
      } else {
        const maxWidth = column.maxWidth
        const minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH
        increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft
      }

      column.calculatedWidth = (column.calculatedWidth as number) + increment
      totalWidth += increment
    }

    return adjustedColumns
  }
}

const MIN_COLUMN_WIDTH = 100 // this is the global min width

export function buildColumns (
  items: any[],
  canResizeColumns?: boolean,
  onColumnClick?: (ev: any, column: any) => void,
  sortedColumnKey?: string,
  isSortedDescending?: boolean,
  groupedColumnKey?: string,
  isMultiline?: boolean,
) {
  const columns: any[] = []

  if (items && items.length) {
    const firstItem = items[0]

    for (const propName in firstItem) {
      if (Object.prototype.hasOwnProperty.call(firstItem, propName)) {
        columns.push({
          key: propName,
          name: propName,
          fieldName: propName,
          minWidth: MIN_COLUMN_WIDTH,
          maxWidth: 300,
          isCollapsable: !!columns.length,
          isCollapsible: !!columns.length,
          isMultiline: isMultiline === undefined ? false : isMultiline,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
          isRowHeader: false,
          columnActionsMode: 0,
          isResizable: canResizeColumns,
          onColumnClick: onColumnClick,
          isGrouped: groupedColumnKey === propName,
        })
      }
    }
  }

  return columns
}

function getPaddedWidth (column: any, isFirst: boolean, props: any): number {
  const { cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = props

  return (
    column.calculatedWidth! +
    cellStyleProps.cellLeftPadding +
    cellStyleProps.cellRightPadding +
    (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
  )
}
