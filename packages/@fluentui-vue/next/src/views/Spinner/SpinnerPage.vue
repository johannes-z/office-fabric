<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import SpinnerBasicExample from './Spinner.Basic.Example.vue'
import SpinnerBasicExampleCode from './Spinner.Basic.Example.vue?raw'
import SpinnerLabeledExample from './Spinner.Labeled.Example.vue'
import SpinnerLabeledExampleCode from './Spinner.Labeled.Example.vue?raw'

const SpinnerPageProps = {
  title: 'Spinner',
  componentName: 'Spinner',
  componentUrl: '',
  examples: [
    {
      title: 'Spinner sizes',
      view: SpinnerBasicExample,
      code: SpinnerBasicExampleCode,
    },
    {
      title: 'Spinner label positioning',
      view: SpinnerLabeledExample,
      code: SpinnerLabeledExampleCode,
    },
  ],
  overview: import('./docs/SpinnerOverview.md'),
  bestPractices: import('./docs/SpinnerBestPractices.md'),
  dos: import('./docs/SpinnerDos.md'),
  donts: import('./docs/SpinnerDonts.md'),
}
</script>

<template>
  <DocPage v-bind="SpinnerPageProps" />
</template>
