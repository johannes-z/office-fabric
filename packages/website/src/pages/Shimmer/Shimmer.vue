<template>
  <div>
    <h1>Shimmer</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Shimmer</h2>
      <div :class="wrapperClass">
        Basic Shimmer with no elements provided. It defaults to a line of 16px height.
        <Shimmer />
        <Shimmer width="75%" />
        <Shimmer width="50%" />

        Basic Shimmer with elements provided.
        <Shimmer :shimmer-elements="shimmerWithElementFirstRow" />
        <Shimmer :shimmer-elements="shimmerWithElementSecondRow" />
        <Shimmer width="70%" :shimmer-elements="shimmerWithElementThirdRow" />

        Variations of vertical alignment for Circles and Lines.
        <Shimmer :shimmer-elements="shimmerVerticalElement" />
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyles } from '@uifabric/styling'
import { IShimmerElement, Shimmer, ShimmerElementType } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    Shimmer,
  },
})
export default class ShimmerPage extends Vue {
  wrapperClass = mergeStyles({
    padding: 2,
    selectors: {
      '& > .ms-Shimmer-container': {
        margin: '10px 0',
      },
    },
  });

  shimmerWithElementFirstRow = [
    { type: ShimmerElementType.circle },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line },
  ];

  shimmerWithElementSecondRow = [
    { type: ShimmerElementType.circle, height: 24 },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line, height: 16, width: '20%' },
    { type: ShimmerElementType.gap, width: '5%' },
    { type: ShimmerElementType.line, height: 16, width: '20%' },
    { type: ShimmerElementType.gap, width: '10%' },
    { type: ShimmerElementType.line, height: 16, width: '15%' },
    { type: ShimmerElementType.gap, width: '10%' },
    { type: ShimmerElementType.line, height: 16 },
  ];

  shimmerWithElementThirdRow = [
    { type: ShimmerElementType.circle, height: 24 },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line, height: 16, width: '20%' },
    { type: ShimmerElementType.gap, width: '5%' },
    { type: ShimmerElementType.line, height: 16, width: '20%' },
    { type: ShimmerElementType.gap, width: '10%' },
    { type: ShimmerElementType.line, height: 16, width: '15%' },
    { type: ShimmerElementType.gap, width: '10%' },
    { type: ShimmerElementType.line, height: 16 },
  ];

  shimmerVerticalElement: IShimmerElement[] = [
    { type: ShimmerElementType.circle },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.circle, height: 15, verticalAlign: 'top' },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line, verticalAlign: 'bottom', width: '20%' },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line, height: 5, verticalAlign: 'top', width: '20%' },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line, height: 16, width: '15%' },
    { type: ShimmerElementType.gap, width: '2%' },
    { type: ShimmerElementType.line, height: 10, verticalAlign: 'bottom' },
  ];
}
</script>

<style lang="scss" module>
</style>
