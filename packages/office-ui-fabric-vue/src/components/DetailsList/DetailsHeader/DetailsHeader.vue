<template>
  <div :class="classNames.root" role="row">
    <DetailsColumn v-for="(column, index) in columns"
                   :key="column.key"
                   :column="column"
                   :column-index="index"
                   :parent-id="_uid" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { DetailsColumn } from '../DetailsColumn'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component({
  components: { DetailsColumn },
})
export default class DetailsHeader extends BaseComponent {
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
}
</script>
