<script setup lang="ts">
import { ref, watch } from 'vue'
import { Toggle } from '@fluentui-vue/components'

const props = defineProps({
  checked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  onChecked: { type: Function, default: () => {} },
  onDisabled: { type: Function, default: () => {} },
})

const emit = defineEmits(['checked', 'disabled'])
</script>

<template>
  <Toggle
    label="Mark as checked"
    inline-label
    :model-value="checked"
    @update:modelValue="emit('checked', $event)"
  />
  <Toggle
    label="Disable buttons"
    inline-label
    :model-value="disabled"
    @update:modelValue="emit('disabled', $event)"
  />
</template>
