import { Vue, Component, Prop } from 'vue-property-decorator'
// import { IColumn } from './DetailsList.types'
import { css } from '@uifabric-vue/utilities'
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles'
import BaseComponent from '../../BaseComponent'
import { CreateElement } from 'vue'

const getCellText = (item: any, column: any): string => {
  let value = item && column && column.fieldName ? item[column.fieldName] : ''

  if (value === null || value === undefined) {
    value = ''
  }

  if (typeof value === 'boolean') {
    return value.toString()
  }

  return value
}

@Component
export class DetailsRowFields extends BaseComponent {
  @Prop({ type: Object, required: true }) rowClassNames!: any
  @Prop({ type: Array, required: true }) columns!: any[]
  @Prop({ type: Object, required: true }) item!: any
  @Prop({ type: Number, required: true }) itemIndex!: number
  @Prop({ type: Object, default: () => DEFAULT_CELL_STYLE_PROPS }) cellStyleProps!: any

  showAnimation = true

  private calcWidth (column: any) {
    const { cellStyleProps } = this
    const width: string | number =
      typeof column.calculatedWidth === 'undefined'
        ? 'auto'
        : column.calculatedWidth +
          cellStyleProps.cellLeftPadding +
          cellStyleProps.cellRightPadding +
          (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0) + 'px'
    return width
  }

  render (h: CreateElement) {
    const { rowClassNames, columns, showAnimation, item } = this

    return h('div', {
      class: rowClassNames.fields,
      attrs: { role: 'presentation' },
    }, columns.map((column, columnIndex) =>
      h('div', {
        key: columnIndex,
        style: { width: this.calcWidth(column) },
        class: css(
          column.className,
          column.isMultiline && rowClassNames.isMultiline,
          column.isRowHeader && rowClassNames.isRowHeader,
          rowClassNames.cell,
          column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded,
          showAnimation && rowClassNames.cellAnimation,
        ),
        attrs: {
          role: column.isRowHeader ? 'rowheader' : 'gridcell',
          ariaReadonly: true,
        },
      }, [
        this.$scopedSlots[`cell.${column.key}`]
          ? (this.$scopedSlots[`cell.${column.key}`] as any)({ item, column })
          : getCellText(item, column),
      ])),
    )
  }
}
