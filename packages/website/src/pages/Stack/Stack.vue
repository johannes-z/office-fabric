<template>
  <div>
    <h1>Stack</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>Basic Vertical Stack</h2>
      <StackVerticalBasicExample />

      <h2>Reversed Basic Vertical Stack</h2>
      <StackVerticalReversedExample />

      <h2>Vertical Stack - Gap and Padding Sizes</h2>
      <StackVerticalSpacingExample />

      <h2>Vertical Stack - Growing Items</h2>
      <StackVerticalGrowExample />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import StackVerticalBasicExample from './examples/Stack.Vertical.Basic.Example.vue'
import StackVerticalReversedExample from './examples/Stack.Vertical.Reversed.Example.vue'
import StackVerticalSpacingExample from './examples/Stack.Vertical.Spacing.Example.vue'
import StackVerticalGrowExample from './examples/Stack.Vertical.Grow.Example.vue'

@Component({
  components: {
    StackVerticalBasicExample,
    StackVerticalReversedExample,
    StackVerticalSpacingExample,
    StackVerticalGrowExample,
  },
})
export default class StackPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
