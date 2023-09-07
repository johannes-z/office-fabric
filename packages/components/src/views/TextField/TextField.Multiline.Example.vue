<script setup lang="ts">
import { TextField } from '@fluentui-vue/components'
import { computed, ref } from 'vue'

const text = ref('')
const isMultiline = computed(() => text.value.length > 50)
</script>

<template>
  <TextField label="Standard" multiline :rows="3" />
  <TextField label="Disabled" multiline :rows="3" disabled default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut" />
  <TextField label="Non-resizable" multiline :resizable="false" />

  <TextField label="With auto adjusting height" multiline auto-adjust-height />
  <TextField
    v-model="text"
    label="Switches from single to multiline if more than 50 characters are entered"
    :multiline="isMultiline"
  />
</template>
