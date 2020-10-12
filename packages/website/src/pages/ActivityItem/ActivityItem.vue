<template>
  <div>
    <h1>ActivityItem</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h3>Activity Items with Icons</h3>
      <ActivityItemBasicExample />

      <h3>Activity Items with Personas</h3>
      <ActivityItemPersonaExample />

      <h3>Compact Activity Items</h3>
      <ActivityItemCompactExample />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyleSets } from '@uifabric/styling'

import ActivityItemBasicExample from './examples/ActivityItem.Basic.Example.vue'
import ActivityItemCompactExample from './examples/ActivityItem.Compact.Example.vue'
import ActivityItemPersonaExample from './examples/ActivityItem.Persona.Example.vue'

@Component({
  components: {
    ActivityItemBasicExample,
    ActivityItemCompactExample,
    ActivityItemPersonaExample,
  },
})
export default class ActivityItemPage extends Vue {
}
</script>
