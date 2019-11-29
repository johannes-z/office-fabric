<template>
  <div :class="classNames.root">
    <div :class="classNames.content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ISeparatorProps, ISeparatorStyles } from './Separator.types'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Separator.styles'

const verticalAlignment: any = {
  center: 'middle',
  start: 'top',
  end: 'bottom',
}

@Component
export default class Separator extends BaseComponent<ISeparatorProps, ISeparatorStyles> {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  get classNames () {
    return getClassNames(getStyles, {
      theme: this.theme,
      className: this.$attrs.class,
      alignContent: this.alignContent,
      vertical: this.vertical,
    })
  }
}
</script>
