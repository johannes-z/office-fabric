<script setup lang="ts">
import { Label, TextField } from '@fluentui-vue/components'
import { useId } from '@fluentui-vue/hooks'

const textFieldId = useId('anInput')
</script>

<template>
  <Label as="string">I'm a Label</Label>
  <Label disabled>I'm a disabled Label</Label>
  <Label required>I'm a required Label</Label>
  <Label :for="textFieldId">A Label for An Input</Label>
  <TextField :id="textFieldId" />
</template>
