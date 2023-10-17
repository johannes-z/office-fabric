<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import type { IExamplePage } from '../docs.types'

const ProgressIndicatorPageProps: IExamplePage = {
  title: 'ProgressIndicator',
  componentName: 'ProgressIndicator',
  componentUrl: '',
  examples: [
    {
      title: 'Default ProgressIndicator',
      view: () => import('./ProgressIndicator.Basic.Example.vue'),
      code: () => import('./ProgressIndicator.Basic.Example.vue?raw'),
    },
    {
      title: 'Indeterminate ProgressIndicator',
      view: () => import('./ProgressIndicator.Indeterminate.Example.vue'),
      code: () => import('./ProgressIndicator.Indeterminate.Example.vue?raw'),
    },
  ],
  dos: () => import('./docs/ProgressIndicatorDos.md'),
  donts: () => import('./docs/ProgressIndicatorDonts.md'),
  overview: () => import('./docs/ProgressIndicatorOverview.md'),
  bestPractices: () => import('./docs/ProgressIndicatorBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ProgressIndicatorPageProps" />
</template>
