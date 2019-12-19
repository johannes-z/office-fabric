<template>
  <div :class="classNames.root">
    <div v-if="label" :class="classNames.itemName">
      {{ label }}
    </div>

    <div :class="classNames.itemProgress">
      <div :class="classNames.progressTrack" />
      <div :class="classNames.progressBar" :style="progressBarStyles" />
    </div>

    <div v-if="description" :class="classNames.itemDescription">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProgressIndicatorProps, IProgressIndicatorStyles } from './ProgressIndicator.types'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01

@Component
export default class ProgressIndicator extends BaseComponent<IProgressIndicatorProps, IProgressIndicatorStyles> {
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: Number, default: 0 }) percentComplete!: number
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) description!: string

  @Prop({ type: Number, default: 2 }) barHeight!: number

  get classNames () {
    const { className, indeterminate, theme, barHeight } = this
    return getClassNames(this.styles, {
      className,
      indeterminate,
      theme,
      barHeight,
    })
  }

  get progressBarStyles () {
    const { percentComplete } = this
    return {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    }
  }
}
</script>
