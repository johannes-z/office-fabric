<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const SpinnerPageProps = {
  title: 'Spinner',
  componentName: 'Spinner',
  componentUrl: '',
  examples: [
    {
      title: 'Spinner sizes',
      view: () => import('./Spinner.Basic.Example.vue'),
      code: () => import('./Spinner.Basic.Example.vue?raw'),
    },
    {
      title: 'Spinner label positioning',
      view: () => import('./Spinner.Labeled.Example.vue'),
      code: () => import('./Spinner.Labeled.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/SpinnerOverview.md'),
  bestPractices: () => import('./docs/SpinnerBestPractices.md'),
  dos: () => import('./docs/SpinnerDos.md'),
  donts: () => import('./docs/SpinnerDonts.md'),
}
</script>

<template>
  <DocPage v-bind="SpinnerPageProps" />
</template>
