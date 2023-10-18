<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const RatingPageProps = {
  title: 'Rating',
  componentName: 'Rating',
  componentUrl: '',
  examples: [
    {
      title: 'Rating Example',
      view: () => import('./Rating.Basic.Example.vue'),
      code: () => import('./Rating.Basic.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/RatingOverview.md'),
  bestPractices: () => import('./docs/RatingBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="RatingPageProps" />
</template>
