<script setup lang="ts">
import { Checkbox } from '@fluentui-vue/components'
import { ref } from 'vue'

const isIndeterminate = ref(true)
const isChecked = ref(false)

const checked = ref(true)
const checked2 = ref(true)
</script>

<template>
  <Checkbox label="Indeterminate checkbox (uncontrolled)" indeterminate />

  <Checkbox
    :checked="checked2"
    label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
    indeterminate
  />

  <Checkbox label="Disabled indeterminate checkbox" disabled indeterminate />

  <Checkbox
    :checked="isChecked"
    :indeterminate="isIndeterminate"
    label="Indeterminate checkbox (controlled)"
  />
</template>
