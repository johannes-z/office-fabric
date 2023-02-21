<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ProgressIndicator } from '../components'

const intervalDelay = 100
const intervalIncrement = 0.01

const percentComplete = ref(0)

const id = setInterval(() => {
  percentComplete.value = (intervalIncrement + percentComplete.value) % 1
}, intervalDelay)

onBeforeUnmount(() => clearInterval(id))
</script>

<template>
  <h2>Progress Indicator</h2>
  <ProgressIndicator label="Example title" description="Example description" :percent-complete="percentComplete" />

  <ProgressIndicator label="Example title" description="Example description" />
</template>
