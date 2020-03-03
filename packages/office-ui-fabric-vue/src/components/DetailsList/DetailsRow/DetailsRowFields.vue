<template>
  <div :class="rowClassNames.fields" role="presentation">
    <div v-for="(column, columnIndex) in columns"
         :key="columnIndex"
         :role="column.isRowHeader ? 'rowheader' : 'gridcell'"
         aria-readonly
         :class="css(
           column.className,
           column.isMultiline && rowClassNames.isMultiline,
           column.isRowHeader && rowClassNames.isRowHeader,
           rowClassNames.cell,
           column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded,
           showAnimation && rowClassNames.cellAnimation
         )"
         :style="{ width: calcWidth(column) }">
      {{ getCellText(item, column) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
// import { IColumn } from './DetailsList.types'
import { css } from '@uifabric-vue/utilities'
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles'
import BaseComponent from '../../BaseComponent'

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

@Component({
  components: {},
})
export default class DetailsRowFields extends BaseComponent {
  @Prop({ type: Object, required: true }) rowClassNames!: any
  @Prop({ type: Array, required: true }) columns!: any[]
  @Prop({ type: Object, required: true }) item!: any
  @Prop({ type: Number, required: true }) itemIndex!: number
  @Prop({ type: Object, default: () => DEFAULT_CELL_STYLE_PROPS }) cellStyleProps!: any

  getCellText = getCellText
  showAnimation = true

  private calcWidth (column) {
    const { cellStyleProps } = this
    const width: string | number =
      typeof column.calculatedWidth === 'undefined'
        ? 'auto'
        : column.calculatedWidth +
          cellStyleProps.cellLeftPadding +
          cellStyleProps.cellRightPadding +
          (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
    return width
  }
}
</script>

<style lang="scss" scoped>
</style>
