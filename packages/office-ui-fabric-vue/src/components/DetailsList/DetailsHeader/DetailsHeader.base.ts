import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { DetailsColumn } from '../DetailsColumn'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types'
import { CreateElement } from 'vue'

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

  render (h: CreateElement) {
    const { classNames, columns } = this

    return h('div', {
      class: classNames.root, attrs: { role: 'row' },
    }, columns.map((column, index) => h(
      DetailsColumn,
      {
        key: column.key,
        attrs: {
          column,
          columnIndex: index,
          parentId: this.uid,
        },
      },
    )))
  }
}
