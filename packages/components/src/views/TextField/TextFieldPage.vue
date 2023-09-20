<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const TextFieldPageProps = {
  title: 'TextField',
  componentName: 'TextField',
  componentUrl: '',
  examples: [
    {
      title: 'Basic TextFields',
      view: () => import('./TextField.Basic.Example.vue'),
      code: () => import('./TextField.Basic.Example.vue?raw'),
    },
    {
      title: 'Multiline TextField',
      view: () => import('./TextField.Multiline.Example.vue'),
      code: () => import('./TextField.Multiline.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/TextFieldOverview.md'),
  bestPractices: () => import('./docs/TextFieldBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="TextFieldPageProps" />
</template>
