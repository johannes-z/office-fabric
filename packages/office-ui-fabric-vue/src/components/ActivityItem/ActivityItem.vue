<template>
  <div :class="classNames.root">
    <div :class="classNames.activityTypeIcon">
      <slot name="icon" />
    </div>
    <div :class="classNames.activityContent">
      <span :class="classNames.activityText">
        <slot name="description" />
      </span>
      <div v-if="$slots.comments" :class="classNames.commentText">
        <slot name="comments" />
      </div>
      <div :class="classNames.timeStamp">
        <slot name="timeStamp" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getStyles } from './ActivityItem.styles'
import { IActivityItemStyles } from './ActivityItem.types'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component
export default class ActivityItem extends BaseComponent {
  @Prop({ type: Array, default: () => [] }) activityPersonas!: any[]
  @Prop({ type: Boolean, default: false }) animateBeaconSignal!: boolean
  @Prop({ type: String, default: null }) beaconColorOne!: string
  @Prop({ type: String, default: null }) beaconColorTwo!: string
  @Prop({ type: Boolean, default: false }) isCompact!: boolean

  get classNames (): any {
    const { className, activityPersonas, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact } = this

    return getClassNames(
      () => getStyles(undefined, this.styles, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact) as any,
      {}
    )
  }
}
</script>
