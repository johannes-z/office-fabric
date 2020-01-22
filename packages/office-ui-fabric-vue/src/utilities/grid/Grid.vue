<template>
  <table :class="classNames.root">
    <tbody>
      <tr v-for="(rows, rowIndex) in rowsOfItems"
          :key="`${_uid}-${rowIndex}-row`"
          role="row">
        <td v-for="(cell, cellIndex) in rows"
            :key="`${_uid}-${rowIndex}-${cellIndex}-cell`"
            :class="classNames.tableCell">
          <slot :cell="cell" :index="cellIndex" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction, toMatrix } from '@uifabric-vue/utilities'
import { IGrid, IGridProps, IGridStyleProps, IGridStyles } from './Grid.types'
import BaseComponent from '../../components/BaseComponent'

const getClassNames = classNamesFunction<IGridStyleProps, IGridStyles>()

@Component({
  components: {},
  inheritAttrs: false,
})
export default class Grid extends BaseComponent {
  @Prop() items!: any[]
  @Prop() columnCount!: number

  get rowsOfItems () {
    const { items, columnCount } = this
    return toMatrix(items, columnCount)
  }

  get classNames () {
    const { theme, styles } = this

    return getClassNames(styles, { theme })
  }
}
</script>

<style lang="scss" scoped>
</style>
