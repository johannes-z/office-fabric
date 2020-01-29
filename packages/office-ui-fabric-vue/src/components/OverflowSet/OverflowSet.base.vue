<template>
  <div :class="classNames.root">
    <div v-for="(item, index) in items"
         :key="index"
         :class="classNames.item">
      <slot name="item" :item="item" />
    </div>

    <div v-if="overflowItems && overflowItems.length > 0"
         :class="classNames.overlfowButton">
      <slot name="overflow" :items="overflowItems" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'

const getClassNames = classNamesFunction()

@Component({
  components: {},
})
export default class OverflowSet extends BaseComponent {
  @Prop({ type: Array, default: () => [] }) items!: any[]
  @Prop({ type: Array, default: () => [] }) overflowItems!: any[]
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  get classNames () {
    const { styles, className, vertical } = this
    return getClassNames(styles, { className, vertical })
  }
}
</script>

<style lang="scss" scoped>
</style>
