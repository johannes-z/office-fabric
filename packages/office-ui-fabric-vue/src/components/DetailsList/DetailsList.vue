<template>
  <div :class="classNames.root">
    <div role="grid">
      <div :class="classNames.headerWrapper">
        <DetailsHeader :columns="columns" />
      </div>
      <div :class="classNames.contentWrapper">
        <List :items="items" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DetailsHeader } from './DetailsHeader'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { List } from '../List'

const getClassNames = classNamesFunction()

@Component({
  components: { DetailsHeader, List },
})
export default class DetailsList extends BaseComponent {
  @Prop({ type: Array, required: true }) columns!: any[]
  @Prop({ type: Array, default: () => [] }) items!: any[]

  get classNames () {
    const {
      styles,
      theme,
      className,
    } = this
    return getClassNames(styles, {
      theme: theme!,
      compact: false,
      isFixed: false,
      isHorizontalConstrained: false,
      className,
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
