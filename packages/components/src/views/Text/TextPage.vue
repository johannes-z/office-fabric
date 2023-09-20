<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import TextBlockExample from './Text.Block.Example.vue'
import TextBlockExampleCode from './Text.Block.Example.vue?raw'
import TextRampExample from './Text.Ramp.Example.vue'
import TextRampExampleCode from './Text.Ramp.Example.vue?raw'
import TextWrapExample from './Text.Wrap.Example.vue'
import TextWrapExampleCode from './Text.Wrap.Example.vue?raw'

const TextPageProps = {
  title: 'Text',
  componentName: 'Text',
  componentUrl: '',
  examples: [
    {
      title: 'Text Ramp Example',
      view: TextRampExample,
      code: TextRampExampleCode,
    },
    {
      title: 'Text Wrap Example',
      view: TextWrapExample,
      code: TextWrapExampleCode,
    },
    {
      title: 'Text Block Example',
      view: TextBlockExample,
      code: TextBlockExampleCode,
    },
  ],
  overview: import('./docs/TextOverview.md'),
  bestPractices: import('./docs/TextBestPractices.md'),
  dos: import('./docs/TextDos.md'),
  donts: import('./docs/TextDonts.md'),
}
</script>

<template>
  <DocPage v-bind="TextPageProps" />
</template>
