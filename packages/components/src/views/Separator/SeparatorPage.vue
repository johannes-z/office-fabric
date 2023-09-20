<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const SeparatorPageProps = {
  title: 'Separator',
  componentName: 'Separator',
  componentUrl: '',
  examples: [
    {
      title: 'Default Separator',
      view: () => import('./Separator.Basic.Example.vue'),
      code: () => import('./Separator.Basic.Example.vue?raw'),
    },
    {
      title: 'Icon Separator',
      view: () => import('./Separator.Icon.Example.vue'),
      code: () => import('./Separator.Icon.Example.vue?raw'),
    },
    {
      title: 'Theming Separator',
      view: () => import('./Separator.Theming.Example.vue'),
      code: () => import('./Separator.Theming.Example.vue?raw'),
    },
  ],
  dos: () => import('./docs/SeparatorDos.md'),
  donts: () => import('./docs/SeparatorDonts.md'),
  overview: () => import('./docs/SeparatorOverview.md'),
  bestPractices: () => import('./docs/SeparatorBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="SeparatorPageProps" />
</template>
