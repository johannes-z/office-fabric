<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import SeparatorBasicExample from './Separator.Basic.Example.vue'
import SeparatorBasicExampleCode from './Separator.Basic.Example.vue?raw'
import SeparatorIconExample from './Separator.Icon.Example.vue'
import SeparatorIconExampleCode from './Separator.Icon.Example.vue?raw'
import SeparatorThemingExample from './Separator.Theming.Example.vue'
import SeparatorThemingExampleCode from './Separator.Theming.Example.vue?raw'

const SeparatorPageProps = {
  title: 'Separator',
  componentName: 'Separator',
  componentUrl: '',
  examples: [
    {
      title: 'Default Separator',
      view: SeparatorBasicExample,
      code: SeparatorBasicExampleCode,
    },
    {
      title: 'Icon Separator',
      view: SeparatorIconExample,
      code: SeparatorIconExampleCode,
    },
    {
      title: 'Theming Separator',
      view: SeparatorThemingExample,
      code: SeparatorThemingExampleCode,
    },
  ],
  dos: import('./docs/SeparatorDos.md'),
  donts: import('./docs/SeparatorDonts.md'),
  overview: import('./docs/SeparatorOverview.md'),
  bestPractices: import('./docs/SeparatorBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="SeparatorPageProps" />
</template>
