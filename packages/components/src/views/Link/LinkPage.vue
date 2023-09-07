<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import DocPage from '../components/DocPage.vue'
import LinkBasicExample from './Link.Basic.Example.vue'
import LinkBasicExampleCode from './Link.Basic.Example.vue?raw'

const LinkPageProps = {
  title: 'Link',
  componentName: 'Link',
  componentUrl: '',
  examples: [
    {
      title: 'Link',
      code: LinkBasicExampleCode,
      view: LinkBasicExample,
    },
  ],
  overview: import('./docs/LinkOverview.md'),
  bestPractices: import('./docs/LinkBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="LinkPageProps" />
</template>
