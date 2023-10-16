<script setup lang="ts">
import { Checkbox } from '@fluentui-vue/components'
</script>

<template>
  <Checkbox label="Unchecked checkbox (uncontrolled)" />
  <Checkbox label="Checked checkbox (uncontrolled)" checked />
  <Checkbox label="Disabled checkbox" disabled />
  <Checkbox label="Disabled checked checkbox" disabled checked />
</template>
