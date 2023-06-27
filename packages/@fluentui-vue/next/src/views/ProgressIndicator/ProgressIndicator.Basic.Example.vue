<script setup lang="ts">
import { ProgressIndicator } from '@fluentui-vue/components'
import { onBeforeUnmount, ref } from 'vue'

const intervalDelay = 100
const intervalIncrement = 0.01

const percentComplete = ref(0)

const id = setInterval(() => {
  percentComplete.value = (intervalIncrement + percentComplete.value) % 1
}, intervalDelay)

onBeforeUnmount(() => clearInterval(id))
</script>

<template>
  <ProgressIndicator label="Example title" description="Example description" :percent-complete="percentComplete" />
</template>
