<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const LabelPageProps = {
  title: 'Label',
  componentName: 'Label',
  componentUrl: '',
  examples: [
    {
      title: 'Label',
      view: () => import('./Label.Basic.Example.vue'),
      code: () => import('./Label.Basic.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/LabelOverview.md'),
  bestPractices: () => import('./docs/LabelBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="LabelPageProps" />
</template>
