<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const IconPageProps = {
  title: 'Icon',
  componentName: 'Icon',
  componentUrl: '',
  examples: [
    {
      title: 'Icon',
      code: () => import('./Icon.Basic.Example.vue'),
      view: () => import('./Icon.Basic.Example.vue?raw'),
    },
    {
      title: 'Icon with custom color',
      code: () => import('./Icon.Color.Example.vue'),
      view: () => import('./Icon.Color.Example.vue?raw'),
    },
    {
      title: 'Icon using custom svg',
      code: () => import('./Icon.Svg.Example.vue'),
      view: () => import('./Icon.Svg.Example.vue?raw'),
    },
    {
      title: 'Icon using image sheet',
      code: () => import('./Icon.ImageSheet.Example.vue'),
      view: () => import('./Icon.ImageSheet.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/IconOverview.md'),
  bestPractices: () => import('./docs/IconBestPractices.md'),
  dos: () => import('./docs/IconDos.md'),
  donts: () => import('./docs/IconDonts.md'),
}
</script>

<template>
  <DocPage v-bind="IconPageProps" />
</template>
