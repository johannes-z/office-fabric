<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const TogglePageProps = {
  title: 'Toggle',
  componentName: 'Toggle',
  componentUrl: '',
  examples: [
    {
      title: 'Basic Toggles',
      view: () => import('./Toggle.Basic.Example.vue'),
      code: () => import('./Toggle.Basic.Example.vue?raw'),
    },
    {
      title: 'Toggles with Custom Labels',
      view: () => import('./Toggle.CustomLabel.Example.vue'),
      code: () => import('./Toggle.CustomLabel.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/ToggleOverview.md'),
  bestPractices: () => import('./docs/ToggleBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="TogglePageProps" />
</template>
