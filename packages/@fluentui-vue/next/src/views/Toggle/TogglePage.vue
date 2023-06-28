<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import ToggleBasicExample from './Toggle.Basic.Example.vue'
import ToggleBasicExampleCode from './Toggle.Basic.Example.vue?raw'
import ToggleCustomLabelExample from './Toggle.CustomLabel.Example.vue'
import ToggleCustomLabelExampleCode from './Toggle.CustomLabel.Example.vue?raw'

const TogglePageProps = {
  title: 'Toggle',
  componentName: 'Toggle',
  componentUrl: '',
  examples: [
    {
      title: 'Basic Toggles',
      view: ToggleBasicExample,
      code: ToggleBasicExampleCode,
    },
    {
      title: 'Toggles with Custom Labels',
      view: ToggleCustomLabelExample,
      code: ToggleCustomLabelExampleCode,
    },
  ],
  overview: import('./docs/ToggleOverview.md'),
  bestPractices: import('./docs/ToggleBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="TogglePageProps" />
</template>
