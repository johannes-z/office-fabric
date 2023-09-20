<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const CheckboxPageProps = {
  title: 'Checkbox',
  componentName: 'Checkbox',
  componentUrl: '',
  examples: [
    {
      title: 'Basic Checkboxes',
      view: () => import('./Checkbox.Basic.Example.vue'),
      code: () => import('./Checkbox.Basic.Example.vue?raw'),
    },
    {
      title: 'Other Checkboxes',
      view: () => import('./Checkbox.Other.Example.vue'),
      code: () => import('./Checkbox.Other.Example.vue?raw'),
    },
    {
      title: 'Indeterminate Checkboxes',
      view: () => import('./Checkbox.Indeterminate.Example.vue'),
      code: () => import('./Checkbox.Indeterminate.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/CheckboxOverview.md'),
  bestPractices: () => import('./docs/CheckboxBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="CheckboxPageProps" />
</template>
