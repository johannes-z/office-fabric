<script setup lang="ts">
import { Checkbox } from '@fluentui-vue/components'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <Checkbox v-model="checked" label="Controlled checkbox" />

  <Checkbox label="Checkbox rendered with boxSide 'end'" box-side="end" />

  <Checkbox label="Checkbox with link inside the label">
    <b>test</b>
  </Checkbox>

  <Checkbox label="Checkbox with extra props for the input (including data-*)" />
</template>
