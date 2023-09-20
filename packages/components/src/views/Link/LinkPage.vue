<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const LinkPageProps = {
  title: 'Link',
  componentName: 'Link',
  componentUrl: '',
  examples: [
    {
      title: 'Link',
      view: () => import('./Link.Basic.Example.vue'),
      code: () => import('./Link.Basic.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/LinkOverview.md'),
  bestPractices: () => import('./docs/LinkBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="LinkPageProps" />
</template>
