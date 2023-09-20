<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import LayerBasicExample from './Layer.Basic.Example.vue'
import LayerBasicExampleCode from './Layer.Basic.Example.vue?raw'
import LayerHostedExample from './Layer.Hosted.Example.vue'
import LayerHostedExampleCode from './Layer.Hosted.Example.vue?raw'
import LayerCustomizedExample from './Layer.Customized.Example.vue'
import LayerCustomizedExampleCode from './Layer.Customized.Example.vue?raw'
import LayerNestedLayersExample from './Layer.NestedLayers.Example.vue'
import LayerNestedLayersExampleCode from './Layer.NestedLayers.Example.vue?raw'

const LayerPageProps = {
  title: 'Layer',
  componentName: 'Layer',
  componentUrl: '',
  examples: [
    {
      title: 'Basic layered content',
      view: LayerBasicExample,
      code: LayerBasicExampleCode,
    },
    {
      title: 'Using LayerHost to control projection',
      view: LayerHostedExample,
      code: LayerHostedExampleCode,
    },
    {
      title: 'Using Customizer to control the default layer behavior',
      view: LayerCustomizedExample,
      code: LayerCustomizedExampleCode,
    },
    {
      title: 'Nested Layers Example',
      view: LayerNestedLayersExample,
      code: LayerNestedLayersExampleCode,
    },
  ],
  overview: import('./docs/LayerOverview.md'),
  bestPractices: import('./docs/LayerBestPractices.md'),
  dos: import('./docs/LayerDos.md'),
  donts: import('./docs/LayerDonts.md'),
}
</script>

<template>
  <DocPage v-bind="LayerPageProps" />
</template>
