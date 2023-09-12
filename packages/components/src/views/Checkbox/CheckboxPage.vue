<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import CheckboxBasicExample from './Checkbox.Basic.Example.vue'
import CheckboxBasicExampleCode from './Checkbox.Basic.Example.vue?raw'
import CheckboxIndeterminateExample from './Checkbox.Indeterminate.Example.vue'
import CheckboxIndeterminateExampleCode from './Checkbox.Indeterminate.Example.vue?raw'
import CheckboxOtherExample from './Checkbox.Other.Example.vue'
import CheckboxOtherExampleCode from './Checkbox.Other.Example.vue?raw'

const CheckboxPageProps = {
  title: 'Checkbox',
  componentName: 'Checkbox',
  componentUrl: '',
  examples: [
    {
      title: 'Basic Checkboxes',
      view: CheckboxBasicExample,
      code: CheckboxBasicExampleCode,
    },
    {
      title: 'Other Checkboxes',
      view: CheckboxOtherExample,
      code: CheckboxOtherExampleCode,
    },
    {
      title: 'Indeterminate Checkboxes',
      view: CheckboxIndeterminateExample,
      code: CheckboxIndeterminateExampleCode,
    },
  ],
  overview: import('./docs/CheckboxOverview.md'),
  bestPractices: import('./docs/CheckboxBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="CheckboxPageProps" />
</template>
