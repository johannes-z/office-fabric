<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import DocPage from '../components/DocPage.vue'
import LabelBasicExample from './Label.Basic.Example.vue'
import LabelBasicExampleCode from './Label.Basic.Example.vue?raw'

const LabelPageProps = {
  title: 'Label',
  componentName: 'Label',
  componentUrl: '',
  examples: [
    {
      title: 'Label',
      code: LabelBasicExampleCode,
      view: LabelBasicExample,
    },
  ],
  overview: defineAsyncComponent(() => import('./docs/LabelOverview.md')),
  bestPractices: defineAsyncComponent(() => import('./docs/LabelBestPractices.md')),
}
</script>

<template>
  <DocPage v-bind="LabelPageProps" />
</template>
