<script setup lang="ts">
import { ref, watch } from 'vue'
import { Checkbox } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
import type { IButton } from '@/components/Button/Button.types'
import type { ICheckbox } from '@/components/Checkbox/Checkbox.types'

const componentRef = ref<ICheckbox | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})

const isIndeterminate = ref(true)
const isChecked = ref(false)

const checked = ref(true)
const checked2 = ref(true)
</script>

<template>
  <h1>Checkbox</h1>

  <DocSection title="Usage">
    <ExampleCard title="Basic Checkboxes">
      <Checkbox ref="componentRef" label="Unchecked checkbox (uncontrolled)" />

      <Checkbox label="Checked checkbox (uncontrolled)" default-checked />

      <Checkbox label="Disabled checkbox" disabled />

      <Checkbox label="Disabled checked checkbox" disabled default-checked />
    </ExampleCard>
    <ExampleCard title="Other Implementation Examples">
      <Checkbox v-model="checked" label="Controlled checkbox" />

      <Checkbox label="Checkbox rendered with boxSide &quot;end&quot;" box-side="end" />

      <Checkbox label="Checkbox with link inside the label">
        <b>test</b>
      </Checkbox>

      <Checkbox label="Checkbox with extra props for the input (including data-*)" />
    </ExampleCard>
    <ExampleCard title="Indeterminate Checkboxes">
      <Checkbox label="Indeterminate checkbox (uncontrolled)" indeterminate />

      <Checkbox
        v-model="checked2"
        label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
        indeterminate
      />

      <Checkbox label="Disabled indeterminate checkbox" disabled indeterminate />

      <Checkbox
        v-model="isChecked"
        v-model:indeterminate="isIndeterminate"
        label="Indeterminate checkbox (controlled)"
      />
    </ExampleCard>
  </DocSection>
</template>
