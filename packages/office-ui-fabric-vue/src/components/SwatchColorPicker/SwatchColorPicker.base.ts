import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'

import { Grid } from '../../utils/grid'

import { ISwatchColorPickerProps, ISwatchColorPickerStyleProps, ISwatchColorPickerStyles } from './SwatchColorPicker.types'
import { classNamesFunction } from '@uifabric-vue/utilities'

import { ColorPickerGridCell } from './ColorPickerGridCell'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>()

@Component({
  components: { Grid, ColorPickerGridCell },
  inheritAttrs: false,
})
export class SwatchColorPickerBase extends BaseComponent {
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

  render (h: CreateElement) {
    const { colorCells, columnCount, cellShape, cellWidth, cellHeight } = this

    return h(Grid, {
      attrs: {
        items: colorCells,
        columnCount,
      },
      scopedSlots: {
        default: ({ cell: item }) => h(ColorPickerGridCell, {
          attrs: {
            color: item.color,
            circle: cellShape === 'circle',
            width: cellWidth,
            height: cellHeight,
          },
        }),
      },
    })
  }
}
