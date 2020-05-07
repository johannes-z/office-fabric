import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { DetailsColumn } from '../DetailsColumn'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types'

const getClassNames = classNamesFunction<IDetailsHeaderStyleProps, IDetailsHeaderStyles>()

@Component({
  components: { DetailsColumn },
})
export class DetailsHeaderBase extends BaseComponent {
  @Prop({ type: Array, required: true }) columns!: any[]

  get classNames () {
    const {
      styles,
      theme,
      className,
    } = this
    return getClassNames(styles, {
      theme: theme!,
      isAllSelected: false,
      isSelectAllHidden: false,
      isResizingColumn: false,
      isSizing: false,
      isAllCollapsed: false,
      isCheckboxHidden: false,
      className,
    })
  }

  render () {
    const { classNames, columns } = this
    return (
      <div class={classNames.root} role="row">
        {columns.map((column, index) => (
          <DetailsColumn
            key={column.key}
            column={column}
            columnIndex={index}
            parentId={this.uid} />
        ))}
      </div>
    )
  }
}
