<template>
  <div v-bind="css.root">
    <div v-bind="css.shimmerWrapper">
      <div v-bind="css.shimmerGradient">
        Shimmer
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IShimmerProps, IShimmerStyles } from './Shimmer.types'

@Component({
})
export default class Shimmer extends BaseComponent<IShimmerProps, IShimmerStyles> {
  @Prop() ShimmerName!: string

  get baseStyles (): IShimmerStyles {
    return {
      root: [
        'ms-Shimmer',
        this.$style.root,
      ],
      shimmerWrapper: [
        'ms-Shimmer-shimmerWrapper',
        this.$style.shimmerWrapper,
      ],
      shimmerGradient: [
        'ms-Shimmer-shimmerGradient',
        this.$style.shimmerGradient,
      ],
    }
  }
}
</script>

<style lang="scss" module>
@keyframes animation {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    position: relative;
    height: auto;

  .shimmerWrapper {
    position: relative;
    transform: translateZ(0px);
    background-color: rgb(243, 242, 241);
    overflow: hidden;
    transition: opacity 200ms ease 0s;
  }
  .shimmerGradient{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-direction: normal;
    animation-iteration-count: infinite;
    animation-name: animation;
    background: linear-gradient(to right, rgb(243, 242, 241) 0%, rgb(237, 235, 233) 50%, rgb(243, 242, 241) 100%) 0px 0px / 90% 100% no-repeat rgb(243, 242, 241);
  }
}
</style>
