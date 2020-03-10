<template>
  <div :class="classNames.root">
    <RowFields
      :row-class-names="rowClassNames"
      cells-by-column="{cellsByColumn}"
      :columns="columns"
      :item="item"
      :item-index="0"
      :column-start-index="showCheckbox ? 1 : 0">
      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)"
            :slot="slot"
            :name="slot" />

      <!-- Pass on all scoped slots -->
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </RowFields>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import RowFields from './DetailsRowFields.vue'

const getClassNames = classNamesFunction()

const NO_COLUMNS: any[] = []

@Component({
  components: { RowFields },
})
export default class DetailsRow extends BaseComponent {
  @Prop({ type: Array, required: true }) columns!: any[]
  @Prop({ type: Object, required: true }) item!: any

  @Prop({ type: Boolean, required: true }) compact!: boolean

  showCheckbox = false

  get classNames (): any {
    const {
      styles,
      theme,
      className,
      compact,
    } = this
    return {
      // ...this._classNames,
      ...getClassNames(styles, {
        theme: theme!,
        isSelected: false,
        canSelect: false,
        anySelected: false,
        checkboxCellClassName: '',
        droppingClassName: '',
        className,
        compact,
        enableUpdateAnimations: false,
      }),
    }
  }

  get rowClassNames () {
    return {
      isMultiline: this.classNames.isMultiline,
      isRowHeader: this.classNames.isRowHeader,
      cell: this.classNames.cell,
      cellAnimation: this.classNames.cellAnimation,
      cellPadded: this.classNames.cellPadded,
      cellUnpadded: this.classNames.cellUnpadded,
      fields: this.classNames.fields,
    }
  }

  /**
   * measure cell at index. and call the call back with the measured cell width when finish measure
   *
   * @param index - The cell index
   * @param onMeasureDone - The call back function when finish measure
   */
  public measureCell (index: number, onMeasureDone: (width: number) => void): void {
    const { columns = NO_COLUMNS } = this
    const column: any = { ...columns[index] }

    column.minWidth = 0
    column.maxWidth = 999999

    delete column.calculatedWidth

    // this.setState({
    //   columnMeasureInfo: {
    //     index,
    //     column,
    //     onMeasureDone,
    //   },
    // })
  }
}
</script>

<style lang="scss" scoped>
</style>
