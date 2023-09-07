<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import ActivityItemBasicExample from './ActivityItem.Basic.Example.vue'
import ActivityItemBasicExampleCode from './ActivityItem.Basic.Example.vue?raw'
import ActivityItemCompactExample from './ActivityItem.Compact.Example.vue'
import ActivityItemCompactExampleCode from './ActivityItem.Compact.Example.vue?raw'
import ActivityItemPersonaExample from './ActivityItem.Persona.Example.vue'
import ActivityItemPersonaExampleCode from './ActivityItem.Persona.Example.vue?raw'

const ActivityItemPageProps = {
  title: 'ActivityItem',
  componentName: 'ActivityItem',
  componentUrl: '',
  examples: [
    {
      title: 'Activity Items with Icons',
      view: ActivityItemBasicExample,
      code: ActivityItemBasicExampleCode,
    },
    {
      title: 'Activity Items with Personas',
      view: ActivityItemPersonaExample,
      code: ActivityItemPersonaExampleCode,
    },
    {
      title: 'Compact Activity Items',
      view: ActivityItemCompactExample,
      code: ActivityItemCompactExampleCode,
    },
  ],
  overview: import('./docs/ActivityItemOverview.md'),
  bestPractices: import('./docs/ActivityItemBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ActivityItemPageProps" />
</template>
