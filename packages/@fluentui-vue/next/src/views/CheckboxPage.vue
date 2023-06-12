<script setup lang="ts">
import { ref, watch } from 'vue'
import { Checkbox } from '../components'
import type { IButton } from '@/components/Button/Button.types'

const componentRef = ref<IButton | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})
</script>

<template>
  <h1>Checkbox</h1>
  <Checkbox ref="componentRef" label="Unchecked checkbox (uncontrolled)" />

  <Checkbox label="Checked checkbox (uncontrolled)" default-checked />

  <Checkbox label="Disabled checkbox" disabled />

  <Checkbox label="Disabled checked checkbox" disabled default-checked />

  <Checkbox label="Controlled checkbox" :checked="true" />

  <Checkbox label="Checkbox rendered with boxSide &quot;end&quot;" box-side="end" />

  <Checkbox label="Checkbox with link inside the label">
    <b>test</b>
  </Checkbox>

  <Checkbox label="Checkbox with extra props for the input (including data-*)" />
</template>
