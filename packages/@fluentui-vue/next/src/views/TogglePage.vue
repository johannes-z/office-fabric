<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '../components'

const value1 = ref(true)
</script>

<template>
  <h1>Toggle</h1>

  <Toggle v-model="value1" label="Enabled and checked" on-text="On" off-text="Off" />

  <Toggle label="Enabled and unchecked" on-text="On" off-text="Off" />

  <Toggle label="Disabled and checked" default-checked disabled on-text="On" off-text="Off" />

  <Toggle label="Disabled and unchecked" disabled on-text="On" off-text="Off" />

  <Toggle label="With inline label" inline-label on-text="On" off-text="Off" />

  <Toggle label="Disabled with inline label" inline-label disabled on-text="On" off-text="Off" />

  <Toggle label="With inline label and without onText and offText" inline-label />

  <Toggle label="Disabled with inline label and without onText and offText" inline-label disabled />

  <Toggle
    label="Enabled and checked (ARIA 1.0 compatible)"
    default-checked
    on-text="On"
    off-text="Off"
    role="checkbox"
  />

  <Toggle v-model="value1">
    <template #label>
      Controlled with custom label template
    </template>
  </Toggle>
</template>
