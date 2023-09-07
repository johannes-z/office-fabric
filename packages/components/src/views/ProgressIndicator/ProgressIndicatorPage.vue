<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import ProgressIndicatorBasicExample from './ProgressIndicator.Basic.Example.vue'
import ProgressIndicatorBasicExampleCode from './ProgressIndicator.Basic.Example.vue?raw'
import ProgressIndicatorIndeterminateExample from './ProgressIndicator.Indeterminate.Example.vue'
import ProgressIndicatorIndeterminateExampleCode from './ProgressIndicator.Indeterminate.Example.vue?raw'

const ProgressIndicatorPageProps = {
  title: 'ProgressIndicator',
  componentName: 'ProgressIndicator',
  componentUrl: '',
  examples: [
    {
      title: 'Default ProgressIndicator',
      view: ProgressIndicatorBasicExample,
      code: ProgressIndicatorBasicExampleCode,
    },
    {
      title: 'Indeterminate ProgressIndicator',
      view: ProgressIndicatorIndeterminateExample,
      code: ProgressIndicatorIndeterminateExampleCode,
    },
  ],
  dos: import('./docs/ProgressIndicatorDos.md'),
  donts: import('./docs/ProgressIndicatorDonts.md'),
  overview: import('./docs/ProgressIndicatorOverview.md'),
  bestPractices: import('./docs/ProgressIndicatorBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="ProgressIndicatorPageProps" />
</template>
