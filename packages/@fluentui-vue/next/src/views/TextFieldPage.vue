<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ITextField } from '../components'
import { TextField } from '../components'

function onRef(el?: ITextField) {
  el?.focus()
}

defineExpose({
  onRef,
})

const text = ref('')
function onChange(_, value) {
  text.value = value
}
const text2 = ref('')
const isMultiline = computed(() => text2.value.length > 50)
</script>

<template>
  <h1>TextField</h1>

  <TextField
    :component-ref="onRef"
    placeholder="string.newFolderPlaceholder"
    error-message="folderNameError"
    :styles="{ root: { width: '100%' } }"
    :model-value="text"
    @change="onChange"
    @clear.stop
    @keydown.enter.stop.prevent="onChange"
  />

  <TextField label="Standard" />
  <TextField label="Disabled" disabled default-value="I am disabled" />
  <TextField label="Read-only" readonly default-value="I am read-only" />
  <TextField label="Required " required />
  <TextField aria-label="Required without visible label" required />
  <TextField label="With error message" error-message="Error message" />

  <h2>Multiline TextField</h2>

  <TextField label="Standard" multiline :rows="3" />
  <TextField label="Disabled" multiline :rows="3" disabled default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut" />
  <TextField label="Non-resizable" multiline :resizable="false" />

  <TextField label="With auto adjusting height" multiline auto-adjust-height />
  <TextField
    v-model="text2"
    label="Switches from single to multiline if more than 50 characters are entered"
    :multiline="isMultiline"
  />
</template>
