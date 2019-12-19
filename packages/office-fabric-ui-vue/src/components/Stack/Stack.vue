<template>
  <div :class="classNames.root">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'
import { styles } from './Stack.styles'

@Component({
  components: {},
})
export default class Stack extends BaseComponent {
  @Prop({ type: String, default: '' }) verticalFill!: string
  @Prop({ type: Boolean, default: false }) horizontal!: boolean
  @Prop({ type: Boolean, default: false }) reversed!: boolean
  @Prop({ type: Number, default: 0 }) gap!: number
  @Prop({ type: Boolean, default: false }) grow!: boolean
  @Prop({ type: Boolean, default: false }) wrap!: boolean
  @Prop({ type: Number, default: 0 }) horizontalAlign!: number
  @Prop({ type: Number, default: 0 }) verticalAlign!: number
  @Prop({ type: Boolean, default: false }) disableShrink!: boolean

  get classNames () {
    const { theme, verticalFill, horizontal, reversed, gap, grow, wrap, horizontalAlign, verticalAlign, disableShrink, className } = this

    return getClassNames(() => styles({
      className,
      verticalFill,
      horizontal,
      reversed,
      gap,
      grow,
      wrap,
      horizontalAlign,
      verticalAlign,
      disableShrink,
    }, theme), {})
  }
}
</script>
