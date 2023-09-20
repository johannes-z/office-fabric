<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const ActivityItemPageProps = {
  title: 'ActivityItem',
  componentName: 'ActivityItem',
  componentUrl: '',
  examples: [
    {
      title: 'Activity Items with Icons',
      view: () => import('./ActivityItem.Basic.Example.vue'),
      code: () => import('./ActivityItem.Basic.Example.vue?raw'),
    },
    {
      title: 'Activity Items with Personas',
      view: () => import('./ActivityItem.Persona.Example.vue'),
      code: () => import('./ActivityItem.Persona.Example.vue?raw'),
    },
    {
      title: 'Compact Activity Items',
      view: () => import('./ActivityItem.Compact.Example.vue'),
      code: () => import('./ActivityItem.Compact.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/ActivityItemOverview.md'),
  bestPractices: () => import('./docs/ActivityItemBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ActivityItemPageProps" />
</template>
