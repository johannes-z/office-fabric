<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import DocPage from '../components/DocPage.vue'
import IconBasicExample from './Icon.Basic.Example.vue'
import IconBasicExampleCode from './Icon.Basic.Example.vue?raw'
import IconColorExample from './Icon.Color.Example.vue'
import IconColorExampleCode from './Icon.Color.Example.vue?raw'
import IconSvgExample from './Icon.Svg.Example.vue'
import IconSvgExampleCode from './Icon.Svg.Example.vue?raw'
import IconImageSheetExample from './Icon.ImageSheet.Example.vue'
import IconImageSheetExampleCode from './Icon.ImageSheet.Example.vue?raw'

const IconPageProps = {
  title: 'Icon',
  componentName: 'Icon',
  componentUrl: '',
  examples: [
    {
      title: 'Icon',
      code: IconBasicExampleCode,
      view: IconBasicExample,
    },
    {
      title: 'Icon with custom color',
      code: IconColorExampleCode,
      view: IconColorExample,
    },
    {
      title: 'Icon using custom svg',
      code: IconSvgExampleCode,
      view: IconSvgExample,
    },
    {
      title: 'Icon using image sheet',
      code: IconImageSheetExampleCode,
      view: IconImageSheetExample,
    },
  ],
  overview: import('./docs/IconOverview.md'),
  bestPractices: import('./docs/IconBestPractices.md'),
  dos: import('./docs/IconDos.md'),
  donts: import('./docs/IconDonts.md'),
}
</script>

<template>
  <DocPage v-bind="IconPageProps" />
</template>
