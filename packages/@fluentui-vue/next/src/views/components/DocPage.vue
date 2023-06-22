<script setup lang="ts">
import { DefaultEffects } from '@fluentui-vue/style-utilities'
import type { PropType } from 'vue'
import DocSection from './DocSection.vue'
import ExampleCard from './ExampleCard.vue'

defineProps({
  title: { type: String, default: '' },
  componentName: { type: String, default: '' },
  componentUrl: { type: String, default: '' },
  examples: { type: Array as PropType<any>, default: () => [] },
  overview: { type: Object, default: undefined },
  bestPractices: { type: Object, default: undefined },
})
</script>

<template>
  <h1>{{ componentName }}</h1>
  <DocSection v-if="overview">
    <component :is="overview" />
  </DocSection>
  <DocSection v-if="bestPractices" title="Best practices">
    <component :is="bestPractices" />
  </DocSection>
  <DocSection title="Usage">
    <ExampleCard v-for="(example, index) in examples" :key="index" :title="example.title">
      <component :is="example.view" />
      <pre>{{ example.code }}</pre>
    </ExampleCard>
  </DocSection>
</template>
