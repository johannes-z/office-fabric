<template>
  <Callout :target="target"
           :directional-hint="directionalHint"
           :class="css('ms-ContextualMenu-Callout', calloutProps && calloutProps.className)"
           :is-beak-visible="false"
           @dismiss="onDismiss">
    <div :style="contextMenuStyle"
         :class="classNames.container">
      <div :class="classNames.root">
        <ul :class="classNames.list" role="menu">
          <li v-for="(item, index) in items"
              :key="item.key || index"
              :class="classNames.item">
            <ContextualMenuItem :item="item" :prop-class-names="classNames" />
          </li>
        </ul>
      </div>
    </div>
  </Callout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Callout } from '../Callout'
import { DirectionalHint } from '../../common/DirectionalHint'
import { css, classNamesFunction } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'

import { ContextualMenuItem } from './ContextualMenuItem'

const getClassNames = classNamesFunction<any, any>({
  disableCaching: true,
})

@Component({
  components: { Callout, ContextualMenuItem },
})
export default class ContextualMenu extends BaseComponent {
  @Prop() target!: HTMLElement
  @Prop({ type: Object, default: () => {} }) calloutProps!: any
  @Prop({ type: Number, default: DirectionalHint.bottomAutoEdge }) directionalHint!: boolean
  @Prop({ type: Function, default: () => null }) onDismiss!: () => void
  @Prop({ type: Array, default: () => [] }) items!: any[]

  created () {
    console.log(this.target)
  }

  get classNames () {
    const { styles, theme, className } = this

    return getClassNames(styles, {
      theme,
      className,
    })
  }

  get contextMenuStyle () {
    const targetBoundingRect = this.target.getBoundingClientRect()
    const targetWidth = targetBoundingRect.width - 2 /* Accounts for 1px border */
    return {
      width: `${targetWidth}px`,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
