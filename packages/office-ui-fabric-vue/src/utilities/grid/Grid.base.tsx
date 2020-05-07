import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction, toMatrix } from '@uifabric-vue/utilities'
import { IGrid, IGridProps, IGridStyleProps, IGridStyles } from './Grid.types'
import BaseComponent from '../../components/BaseComponent'

const getClassNames = classNamesFunction<IGridStyleProps, IGridStyles>()

@Component({
  components: {},
  inheritAttrs: false,
})
export class GridBase extends BaseComponent {
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

  render (h) {
    const { classNames, rowsOfItems } = this
    return (
      <table class={classNames.root}>
        <tbody>
          {rowsOfItems.map((rows, rowIndex) => (
            <tr key={`${this.uid}-${rowIndex}-row`} role="row">
              {rows.map((cell, cellIndex) => (
                <td key={`${this.uid}-${rowIndex}-${cellIndex}-cell`}
                  class={classNames.tableCell}>
                  {this.$scopedSlots.default ? this.$scopedSlots.default({ cell, index: cellIndex }) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
