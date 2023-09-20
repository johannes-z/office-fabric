<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import SearchBoxFullSizeExample from './SearchBox.FullSize.Example.vue'
import SearchBoxFullSizeExampleCode from './SearchBox.FullSize.Example.vue?raw'
import SearchBoxUnderlinedExample from './SearchBox.Underlined.Example.vue'
import SearchBoxUnderlinedExampleCode from './SearchBox.Underlined.Example.vue?raw'
import SearchBoxDisabledExample from './SearchBox.Disabled.Example.vue'
import SearchBoxDisabledExampleCode from './SearchBox.Disabled.Example.vue?raw'
import SearchBoxCustomIconExample from './SearchBox.CustomIcon.Example.vue'
import SearchBoxCustomIconExampleCode from './SearchBox.CustomIcon.Example.vue?raw'
import SearchBoxSmallExample from './SearchBox.Small.Example.vue'
import SearchBoxSmallExampleCode from './SearchBox.Small.Example.vue?raw'

const SearchBoxPageProps = {
  title: 'SearchBox',
  componentName: 'SearchBox',
  componentUrl: '',
  examples: [
    {
      title: 'Default SearchBox',
      view: SearchBoxFullSizeExample,
      code: SearchBoxFullSizeExampleCode,
    },
    {
      title: 'Underlined SearchBox',
      view: SearchBoxUnderlinedExample,
      code: SearchBoxUnderlinedExampleCode,
    },
    {
      title: 'Disabled SearchBox',
      view: SearchBoxDisabledExample,
      code: SearchBoxDisabledExampleCode,
    },
    {
      title: 'SearchBox with custom icon',
      view: SearchBoxCustomIconExample,
      code: SearchBoxCustomIconExampleCode,
    },
    {
      title: 'SearchBox with fixed width and custom event handling',
      view: SearchBoxSmallExample,
      code: SearchBoxSmallExampleCode,
    },
  ],
  overview: import('./docs/SearchBoxOverview.md'),
  bestPractices: import('./docs/SearchBoxBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="SearchBoxPageProps" />
</template>
