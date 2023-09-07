<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import TextFieldBasicExample from './TextField.Basic.Example.vue'
import TextFieldBasicExampleCode from './TextField.Basic.Example.vue?raw'
import TextFieldMultilineExample from './TextField.Multiline.Example.vue'
import TextFieldMultilineExampleCode from './TextField.Multiline.Example.vue?raw'

const TextFieldPageProps = {
  title: 'TextField',
  componentName: 'TextField',
  componentUrl: '',
  examples: [
    {
      title: 'Basic TextFields',
      view: TextFieldBasicExample,
      code: TextFieldBasicExampleCode,
    },
    {
      title: 'Multiline TextField',
      view: TextFieldMultilineExample,
      code: TextFieldMultilineExampleCode,
    },
  ],
  overview: import('./docs/TextFieldOverview.md'),
  bestPractices: import('./docs/TextFieldBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="TextFieldPageProps" />
</template>
