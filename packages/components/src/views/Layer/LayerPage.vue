<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const LayerPageProps = {
  title: 'Layer',
  componentName: 'Layer',
  componentUrl: '',
  examples: [
    {
      title: 'Basic layered content',
      view: () => import('./Layer.Basic.Example.vue'),
      code: () => import('./Layer.Basic.Example.vue?raw'),
    },
    {
      title: 'Using LayerHost to control projection',
      view: () => import('./Layer.Hosted.Example.vue'),
      code: () => import('./Layer.Hosted.Example.vue?raw'),
    },
    {
      title: 'Using Customizer to control the default layer behavior',
      view: () => import('./Layer.Customized.Example.vue'),
      code: () => import('./Layer.Customized.Example.vue?raw'),
    },
    {
      title: 'Nested Layers Example',
      view: () => import('./Layer.NestedLayers.Example.vue'),
      code: () => import('./Layer.NestedLayers.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/LayerOverview.md'),
  bestPractices: () => import('./docs/LayerBestPractices.md'),
  dos: () => import('./docs/LayerDos.md'),
  donts: () => import('./docs/LayerDonts.md'),
}
</script>

<template>
  <DocPage v-bind="LayerPageProps" />
</template>
