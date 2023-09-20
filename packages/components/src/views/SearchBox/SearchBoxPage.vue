<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const SearchBoxPageProps = {
  title: 'SearchBox',
  componentName: 'SearchBox',
  componentUrl: '',
  examples: [
    {
      title: 'Default SearchBox',
      view: () => import('./SearchBox.FullSize.Example.vue'),
      code: () => import('./SearchBox.FullSize.Example.vue?raw'),
    },
    {
      title: 'Underlined SearchBox',
      view: () => import('./SearchBox.Underlined.Example.vue'),
      code: () => import('./SearchBox.Underlined.Example.vue?raw'),
    },
    {
      title: 'Disabled SearchBox',
      view: () => import('./SearchBox.Disabled.Example.vue'),
      code: () => import('./SearchBox.Disabled.Example.vue?raw'),
    },
    {
      title: 'SearchBox with custom icon',
      view: () => import('./SearchBox.CustomIcon.Example.vue'),
      code: () => import('./SearchBox.CustomIcon.Example.vue?raw'),
    },
    {
      title: 'SearchBox with fixed width and custom event handling',
      view: () => import('./SearchBox.Small.Example.vue'),
      code: () => import('./SearchBox.Small.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/SearchBoxOverview.md'),
  bestPractices: () => import('./docs/SearchBoxBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="SearchBoxPageProps" />
</template>
