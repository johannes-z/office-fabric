<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'

const value1 = ref(true)
function onChange(value: boolean) {
  console.log(value)
}
</script>

<template>
  <h1>Toggle</h1>

  <DocSection>
    A toggle represents a physical switch that allows someone to choose between two mutually exclusive options.  For
    example, "On/Off", "Show/Hide". Choosing an option should produce an immediate result.
  </DocSection>

  <DocSection title="Usage">
    <ExampleCard title="Basic Toggles">
      <Toggle v-model="value1" label="Enabled and checked" on-text="On" off-text="Off" />

      <Toggle label="Enabled and unchecked" on-text="On" off-text="Off" @change="onChange" />

      <Toggle label="Disabled and checked" disabled on-text="On" off-text="Off" />

      <Toggle label="Disabled and unchecked" disabled on-text="On" off-text="Off" />

      <Toggle label="With inline label" inline-label on-text="On" off-text="Off" />

      <Toggle label="Disabled with inline label" inline-label disabled on-text="On" off-text="Off" />

      <Toggle label="With inline label and without onText and offText" inline-label />

      <Toggle label="Disabled with inline label and without onText and offText" inline-label disabled />

      <Toggle
        label="Enabled and checked (ARIA 1.0 compatible)"
        on-text="On"
        off-text="Off"
        role="checkbox"
      />

      <Toggle v-model="value1">
        <template #label>
          Controlled with custom label template
        </template>
      </Toggle>
    </ExampleCard>
  </DocSection>

  <DocSection title="Implementation">
    test
  </DocSection>
</template>
