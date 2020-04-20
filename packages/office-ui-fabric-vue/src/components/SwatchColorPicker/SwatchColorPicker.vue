<template>
  <Grid :items="colorCells" :column-count="columnCount">
    <template #default="{ cell: item }">
      <ColorPickerGridCell
        :color="item.color"
        :circle="cellShape === 'circle'"
        :width="cellWidth"
        :height="cellHeight" />
    </template>
  </Grid>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'

import { Grid } from '../../utilities/grid/'

import { ISwatchColorPickerProps, ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types'
import { classNamesFunction } from '@uifabric-vue/utilities'

import { ColorPickerGridCell } from './ColorPickerGridCell/'

const getClassNames = classNamesFunction<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>()

@Component({
  components: { Grid, ColorPickerGridCell },
  inheritAttrs: false,
})
export default class SwatchColorPicker extends BaseComponent {
  @Prop({ default: 10 }) cellMargin!: number

  @Prop({ type: Array, default: () => [] }) colorCells!: any[]
  @Prop({ type: Number }) columnCount!: number
  @Prop({ type: String, default: 'circle' }) cellShape!: string

  @Prop({ type: Number }) cellHeight!: number
  @Prop({ type: Number }) cellWidth!: number

  get classNames () {
    const { theme, styles, className, cellMargin } = this
    return getClassNames(styles!, {
      theme,
      className,
      cellMargin,
    })
  }
}
</script>
