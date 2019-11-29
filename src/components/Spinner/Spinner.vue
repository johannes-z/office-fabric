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
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Spinner.styles'

@Component
export default class Spinner extends BaseComponent<ISpinnerProps, ISpinnerStyles> {
  @Prop({ default: null }) labelPosition!: string
  @Prop({ default: null }) label!: string
  @Prop({ default: 20 }) size!: number

  get classNames () {
    const { theme, className, size, labelPosition } = this
    return getClassNames(getStyles, {
      theme,
      size,
      className,
      labelPosition,
    })
  }
}
</script>
