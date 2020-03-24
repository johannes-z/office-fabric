<template>
  <div>
    <h1>ScrollablePane</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>Default</h2>
      <ScrollablePaneBasicExample />

      <h2>DetailsList Locked Header</h2>
      <ScrollablePaneDetailsHeaderExample />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ScrollablePaneBasicExample from './examples/ScrollablePane.Basic.Example.vue'
import ScrollablePaneDetailsHeaderExample from './examples/ScrollablePane.DetailsHeader.Example.vue'

@Component({
  components: {
    ScrollablePaneBasicExample,
    ScrollablePaneDetailsHeaderExample,
  },
})
export default class ScrollablePanePage extends Vue {
}
</script>

<style lang="scss" module>
</style>
