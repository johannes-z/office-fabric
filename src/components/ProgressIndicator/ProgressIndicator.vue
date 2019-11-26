<template>
  <div :class="classNames.root">
    <div v-if="label" :class="$style.itemName">
      {{ label }}
    </div>

    <div :class="classNames.itemProgress" :style="{ '--barHeight': `${barHeight}px`}">
      <div :class="classNames.progressTrack" />
      <div :class="classNames.progressBar"
           :style="{ '--progress': !indeterminate ? `${percentComplete}%` : null }" />
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

@Component
export default class ProgressIndicator extends BaseComponent<IProgressIndicatorProps, IProgressIndicatorStyles> {
  @Prop({ default: false }) indeterminate!: boolean
  @Prop({ default: 0 }) percentComplete!: number
  @Prop({ default: null }) label!: string
  @Prop({ default: null }) description!: string

  @Prop({ default: 2 }) barHeight!: number

  protected get classes (): IProgressIndicatorStyles {
    const { $style, indeterminate, label, description } = this
    return {
      root: [
        'ms-ProgressIndicator',
        $style.root,
        indeterminate && $style.indeterminate,
      ],
      itemName: [
        $style.itemName,
      ],
      itemProgress: [
        $style.itemProgress,
      ],
      progressTrack: [
        $style.progressTrack,
      ],
      progressBar: [
        $style.progressBar,
      ],
      itemDescription: [
        $style.itemDescription,
      ],
    }
  }
}
</script>

<style lang="scss" module>
@keyframes IndeterminateProgress {
  0% {
    left: -30%
  }
  100% {
    left: 100%
  }
}
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
}
.itemProgress {
  position: relative;
  height: var(--barHeight, 2px);
  padding-top: 8px;
  padding-right: 0px;
  padding-bottom: 8px;
  padding-left: 0px;
  overflow: hidden;
}
.progressTrack {
  position: absolute;
  width: 100%;
  height: var(--barHeight, 2px);
  background-color: rgb(237, 235, 233);
}
.progressBar {
  background-color: rgb(0, 120, 212);
  height: var(--barHeight, 2px);
  position: absolute;
  transition: width 0.15s linear 0s;
  width: var(--progress, 0);
}
.itemName {
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(50, 49, 48);
  padding-top: 4px;
  line-height: 20px;
  overflow: hidden;
}
.itemDescription {
  color: rgb(96, 94, 92);
  font-size: 12px;
  line-height: 18px;
}

.indeterminate {
  .progressBar {
    height: var(--barHeight, 2px);
    position: absolute;
    width: 0px;
    min-width: 33%;
    transition: width 0.3s ease 0s;
    background:
      linear-gradient(to right,
        rgb(237, 235, 233) 0%,
        rgb(0, 120, 212) 50%,
        rgb(237, 235, 233) 100%
      );
    animation: IndeterminateProgress 3s infinite;
  }
}
</style>
