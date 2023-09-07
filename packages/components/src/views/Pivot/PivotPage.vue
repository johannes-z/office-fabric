<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import PivotBasicExample from './Pivot.Basic.Example.vue'
import PivotBasicExampleCode from './Pivot.Basic.Example.vue?raw'
import PivotIconCountExample from './Pivot.IconCount.Example.vue'
import PivotIconCountExampleCode from './Pivot.IconCount.Example.vue?raw'

const PivotPageProps = {
  title: 'Pivot',
  componentName: 'Pivot',
  componentUrl: '',
  examples: [
    {
      title: 'Pivot sizes',
      view: PivotBasicExample,
      code: PivotBasicExampleCode,
    },
    {
      title: 'Count and Icon',
      view: PivotIconCountExample,
      code: PivotIconCountExampleCode,
    },
  ],
  overview: import('./docs/PivotOverview.md'),
  bestPractices: import('./docs/PivotBestPractices.md'),
  dos: import('./docs/PivotDos.md'),
  donts: import('./docs/PivotDonts.md'),
}
</script>

<template>
  <DocPage v-bind="PivotPageProps" />
</template>
