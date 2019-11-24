<template>
  <div :class="[$style.root, indeterminate && $style.indeterminate]">
    <div v-if="label" :class="$style.itemName">
      {{ label }}
    </div>

    <div :class="$style.itemProgress" :style="barHeightStyle">
      <div :class="$style.progressTrack" :style="barHeightStyle" />
      <div :class="$style.progressBar"
           :style="[
             barHeightStyle,
             !indeterminate && { width: `${percentComplete}%`}
           ]" />
    </div>

    <div v-if="description" :class="$style.itemDescription">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ProgressIndicator extends Vue {
  @Prop({ default: false }) indeterminate!: boolean
  @Prop({ default: 0 }) percentComplete!: number
  @Prop({ default: null }) label!: string
  @Prop({ default: null }) description!: string

  @Prop({ default: 2 }) barHeight!: number

  get barHeightStyle () {
    return { height: `${this.barHeight}px` }
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
  height: 2px;
  padding-top: 8px;
  padding-right: 0px;
  padding-bottom: 8px;
  padding-left: 0px;
  overflow: hidden;
}
.progressTrack {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: rgb(237, 235, 233);
}
.progressBar {
  background-color: rgb(0, 120, 212);
  height: 2px;
  position: absolute;
  transition: width 0.15s linear 0s;
  width: 0;
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
    height: 2px;
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
