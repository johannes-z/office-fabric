<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const PivotPageProps = {
  title: 'Pivot',
  componentName: 'Pivot',
  componentUrl: '',
  examples: [
    {
      title: 'Pivot sizes',
      view: () => import('./Pivot.Basic.Example.vue'),
      code: () => import('./Pivot.Basic.Example.vue?raw'),
    },
    {
      title: 'Count and Icon',
      view: () => import('./Pivot.IconCount.Example.vue'),
      code: () => import('./Pivot.IconCount.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/PivotOverview.md'),
  bestPractices: () => import('./docs/PivotBestPractices.md'),
  dos: () => import('./docs/PivotDos.md'),
  donts: () => import('./docs/PivotDonts.md'),
}
</script>

<template>
  <DocPage v-bind="PivotPageProps" />
</template>
