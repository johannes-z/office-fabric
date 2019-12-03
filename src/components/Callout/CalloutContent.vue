<template>
  <div :class="classNames.container">
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
import { classNamesFunction } from '../../utilities'
import { getStyles } from './CalloutContent.styles'
import { concatStyleSetsWithProps } from '@uifabric/merge-styles'

const getClassNames = classNamesFunction()

@Component({
  components: {},
})
export default class CalloutContent extends BaseComponent {
  @Prop({ type: HTMLElement, required: true }) target!: HTMLElement
  @Prop() calloutWidth!: number
  @Prop({ default: 16 }) beakWidth!: number
  @Prop({ default: true }) isBeakVisible!: boolean
  @Prop({ default: false }) coverTarget!: boolean
  @Prop({ default: 0 }) gapSpace!: number

  private internalKey = new Date()

  updated () {
    this.internalKey = new Date()
  }

  get classNames () {
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
}
</script>
