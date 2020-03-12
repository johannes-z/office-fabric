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
        <f-shimmer />
        <f-shimmer width="75%" />
        <f-shimmer width="50%" />

        Basic Shimmer with elements provided.
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

@Component
export default class ShimmerPage extends Vue {
  wrapperClass = mergeStyles({
    padding: 2,
    selectors: {
      '& > .ms-Shimmer-container': {
        margin: '10px 0',
      },
    },
  });
}
</script>

<style lang="scss" module>
</style>
