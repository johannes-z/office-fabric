<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ProgressIndicator } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'

const intervalDelay = 100
const intervalIncrement = 0.01

const percentComplete = ref(0)

const id = setInterval(() => {
  percentComplete.value = (intervalIncrement + percentComplete.value) % 1
}, intervalDelay)

onBeforeUnmount(() => clearInterval(id))
</script>

<template>
  <h1>ProgressIndicator</h1>
  <DocSection title="Usage">
    <ExampleCard title="Default ProgressIndicator">
      <ProgressIndicator label="Example title" description="Example description" :percent-complete="percentComplete" />
    </ExampleCard>

    <ExampleCard title="Indeterminate ProgressIndicator">
      <ProgressIndicator label="Example title" description="Example description" />
    </ExampleCard>
  </DocSection>
</template>
