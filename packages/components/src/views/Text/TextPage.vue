<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const TextPageProps = {
  title: 'Text',
  componentName: 'Text',
  componentUrl: '',
  examples: [
    {
      title: 'Text Ramp Example',
      view: () => import('./Text.Ramp.Example.vue'),
      code: () => import('./Text.Ramp.Example.vue?raw'),
    },
    {
      title: 'Text Wrap Example',
      view: () => import('./Text.Wrap.Example.vue'),
      code: () => import('./Text.Wrap.Example.vue?raw'),
    },
    {
      title: 'Text Block Example',
      view: () => import('./Text.Block.Example.vue'),
      code: () => import('./Text.Block.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/TextOverview.md'),
  bestPractices: () => import('./docs/TextBestPractices.md'),
  dos: () => import('./docs/TextDos.md'),
  donts: () => import('./docs/TextDonts.md'),
}
</script>

<template>
  <DocPage v-bind="TextPageProps" />
</template>
