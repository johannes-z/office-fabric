<script setup lang="ts">
import { Checkbox } from '../components'
</script>

<template>
  <h1>Checkbox</h1>
  <Checkbox label="Unchecked checkbox (uncontrolled)" />

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
