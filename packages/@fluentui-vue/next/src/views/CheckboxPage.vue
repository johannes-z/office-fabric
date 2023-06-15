<script setup lang="ts">
import { ref, watch } from 'vue'
import { Checkbox } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
import type { IButton } from '@/components/Button/Button.types'

const componentRef = ref<IButton | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})

const isIndeterminate = ref(true)
const isChecked = ref(false)
function onChange(value: boolean) {
  console.log(value)
  if (isIndeterminate.value)
    isIndeterminate.value = false
  else isChecked.value = !!value
}
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
      <Checkbox label="Indeterminate checkbox (uncontrolled)" default-indeterminate />

      <Checkbox
        v-model="checked2"
        label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
        default-indeterminate
      />

      <Checkbox label="Disabled indeterminate checkbox" disabled default-indeterminate />

      <Checkbox
        label="Indeterminate checkbox (controlled)"
        :indeterminate="isIndeterminate"
        :checked="isChecked"
        @change="onChange"
      />
    </ExampleCard>
  </DocSection>
</template>
