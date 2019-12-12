<template>
  <div :class="classNames.root">
    <div :class="classNames.shimmerWrapper">
      <div :class="classNames.shimmerGradient" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IShimmerProps, IShimmerStyles } from './Shimmer.types'
import { getStyles } from './Shimmer.styles'
import { classNamesFunction } from '@fabric-vue/utilities'

const getClassNames = classNamesFunction<any, IShimmerStyles>()

const TRANSITION_ANIMATION_INTERVAL = 200 /* ms */

@Component({
})
export default class Shimmer extends BaseComponent<IShimmerProps, IShimmerStyles> {
  @Prop({ default: null }) shimmerColors!: any

  get classNames () {
    const { theme, className, shimmerColors } = this
    return getClassNames(getStyles, {
      theme: theme!,
      isDataLoaded: false,
      className,
      transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL,
      shimmerColor: shimmerColors && shimmerColors.shimmer,
      shimmerWaveColor: shimmerColors && shimmerColors.shimmerWave,
    })
  }
}
</script>
