<template>
  <div :class="classNames.root">
    <div :class="classNames.circle" />
    <div v-if="$slots.default || label"
         :class="classNames.label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ISpinnerProps, ISpinnerStyles } from './Spinner.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component
export default class Spinner extends BaseComponent<ISpinnerProps, ISpinnerStyles> {
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) labelPosition!: string
  @Prop({ type: Number, default: 20 }) size!: number

  get classNames () {
    const { theme, className, size, labelPosition } = this
    return getClassNames(this.styles, {
      theme,
      size,
      className,
      labelPosition,
    })
  }
}
</script>
