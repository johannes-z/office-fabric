<template>
  <div ref="callout"
       :class="classNames.container">
    <div :class="classNames.root" :style="{ left: left, top: top }">
      <div v-if="isBeakVisible"
           :class="classNames.beak"
           :style="beakPosition" />
      <div v-if="isBeakVisible" :class="classNames.beakCurtain" />
      <div :class="classNames.calloutMain">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@fabric-vue/utilities'
import { getStyles } from './CalloutContent.styles'
import { concatStyleSetsWithProps } from '@uifabric/merge-styles'
import { clickedOutside } from '@/util'

const getClassNames = classNamesFunction()

@Component({
  components: {},
})
export default class CalloutContent extends BaseComponent {
  $refs!: {
    callout: HTMLDivElement
  }

  @Prop({ type: HTMLElement, required: true }) target!: HTMLElement
  @Prop() calloutWidth!: number
  @Prop({ default: 16 }) beakWidth!: number
  @Prop({ default: true }) isBeakVisible!: boolean
  @Prop({ default: false }) coverTarget!: boolean
  @Prop({ default: 0 }) gapSpace!: number

  private internalKey = new Date()

  created () {
    window.addEventListener('click', this.onGlobalClick, true)
  }

  beforeDestroy () {
    window.removeEventListener('click', this.onGlobalClick, true)
  }

  updated () {
    this.internalKey = new Date()
  }

  get classNames (): any {
    const { theme, className, styles, calloutWidth, beakWidth } = this

    return getClassNames(concatStyleSetsWithProps({
      theme,
      className,
      calloutWidth,
      beakWidth,
    }, getStyles, styles))
  }

  get targetRect (): ClientRect {
    return this.internalKey && this.target.getBoundingClientRect()
  }

  get top () {
    const beakOffset = this.isBeakVisible ? (this.actualBeakWidth / 2) : 0
    const targetOffset = !this.coverTarget ? this.targetRect.height : 0
    return `${this.targetRect.top + this.gapSpace + targetOffset + beakOffset}px`
  }

  get left () {
    return this.targetRect.left + 'px'
  }

  get actualBeakWidth () {
    return Math.sqrt(this.beakWidth * this.beakWidth * 2)
  }

  private get beakPosition () {
    return {
      left: `${this.targetRect.width / 2 - this.beakWidth / 2}px`,
      top: `${-this.beakWidth / 2}px`,
    }
  }

  private get positions () {
    return {

    }
  }

  private onGlobalClick (e: Event) {
    const outside = clickedOutside(e, this.$refs.callout)
    if (outside) this.$emit('dismiss', true)
  }
}
</script>
