<template>
  <div :class="classNames.root">
    <slot v-bind="$props" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { styles } from './Stack.styles'
import { IStackTokens } from './Stack.types'

const getClassNames = classNamesFunction()

@Component({
  components: {},
})
export default class Stack extends BaseComponent {
  @Prop({ type: String, default: '' }) verticalFill!: string
  @Prop({ type: Boolean, default: false }) horizontal!: boolean
  @Prop({ type: Boolean, default: false }) reversed!: boolean
  @Prop({ type: Number, default: 0 }) childrenGap!: number
  @Prop({ type: Boolean, default: false }) grow!: boolean
  @Prop({ type: Boolean, default: false }) wrap!: boolean
  @Prop({ type: Number, default: 0 }) horizontalAlign!: number
  @Prop({ type: Number, default: 0 }) verticalAlign!: number
  @Prop({ type: Boolean, default: false }) disableShrink!: boolean

  @Prop({ type: Object, default: () => {} }) tokens!: IStackTokens

  get classNames () {
    const { theme, verticalFill, horizontal, reversed, grow, wrap, horizontalAlign, verticalAlign, disableShrink, className } = this

    return getClassNames(() => styles({
      className,
      verticalFill,
      horizontal,
      reversed,
      grow,
      wrap,
      horizontalAlign,
      verticalAlign,
      disableShrink,
    }, theme, this.tokens))
  }
}
</script>
