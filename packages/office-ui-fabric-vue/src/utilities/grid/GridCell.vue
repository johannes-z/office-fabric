<template>
  <ActionButton>
    <slot :item="item"
          :className="css(className, {
            ['' + cellIsSelectedStyle]: selected,
            ['' + cellDisabledStyle]: disabled
          })"
          :getClassNames="getClassNames" />
  </ActionButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../components/BaseComponent'

import { ActionButton } from '../../components/Button/'

@Component({
  components: { ActionButton },
})
export default class GridCell extends BaseComponent {
  @Prop({ type: Object, default: () => {} }) item!: any

  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) selected!: boolean

  @Prop({ type: String }) cellDisabledStyle!: string
  @Prop({ type: String }) cellIsSelectedStyle!: string

  @Prop() getClassNames!: any
}
</script>

<style lang="scss" scoped>
</style>
