<script setup lang="ts">
import { CompoundButton, type IStackTokens, Stack } from '@fluentui-vue/components'

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 }

// These are set based on the toggles shown above the examples (not needed in real code)
defineProps({
  checked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <Stack horizontal :tokens="stackTokens">
    <CompoundButton :disabled="disabled" :checked="checked" secondary-text="This is the secondary text.">
      Standard
    </CompoundButton>
    <CompoundButton :disabled="disabled" :checked="checked" primary secondary-text="This is the secondary text.">
      Primary
    </CompoundButton>
  </Stack>
</template>
