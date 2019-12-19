<template>
  <div :class="classNames.root">
    <div :class="classNames.activityTypeIcon">
      <slot name="icon" />
    </div>
    <div :class="classNames.activityContent">
      <span :class="classNames.activityText">
        <slot name="description" />
      </span>
      <div :class="classNames.commentText">
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
import { getClassNames } from '../../util/getClassNames'
import { IActivityItemStyles } from './ActivityItem.types'

@Component
export default class ActivityItem extends BaseComponent<any, IActivityItemStyles> {
  @Prop({ type: Array, default: () => [] }) activityPersonas!: any[]
  @Prop({ type: Boolean, default: false }) animateBeaconSignal!: boolean
  @Prop({ type: String, default: null }) beaconColorOne!: string
  @Prop({ type: String, default: null }) beaconColorTwo!: string
  @Prop({ type: Boolean, default: false }) isCompact!: boolean

  get classNames (): any {
    const { className, activityPersonas, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact } = this

    return getClassNames(
      () => getStyles(undefined, undefined, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact),
      {}
    )
  }
}
</script>
