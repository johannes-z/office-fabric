<script setup lang="ts">
import { useId } from '@fluentui-vue/vue-hooks'
import { ref } from 'vue'
import { Label } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import { TextField } from '@/components/TextField'

const textFieldId = useId('anInput')
const required = ref(false)
</script>

<template>
  <h1>Label</h1>
  <DocumentCard>
    <button @click="required = !required">
      test
    </button>
    <Label :required="required">I'm a Label</Label>
    <Label disabled>I'm a disabled Label</Label>
    <Label required>I'm a required Label</Label>
    <Label :for="textFieldId">A Label for An Input</Label>
    <TextField :id="textFieldId" />
  </DocumentCard>
</template>
