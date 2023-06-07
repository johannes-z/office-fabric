<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ProgressIndicator } from '../components'
import DocSection from './components/DocSection.vue'

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

  <DocSection>
    <h2>Usage</h2>

    <h3>Default ProgressIndicator</h3>
    <ProgressIndicator label="Example title" description="Example description" :percent-complete="percentComplete" />

    <h3>Indeterminate ProgressIndicator</h3>
    <ProgressIndicator label="Example title" description="Example description" />
    <ProgressIndicator label="Example title" description="Example description" :bar-height="5" />
  </DocSection>
</template>
