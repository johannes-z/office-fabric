<script setup lang="ts">
import { DefaultButton, type IStackTokens, Stack } from '@fluentui-vue/components'

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
    <DefaultButton :disabled="disabled" :checked="checked">
      Standard
    </DefaultButton>
    <DefaultButton :disabled="disabled" :checked="checked" primary>
      Primary
    </DefaultButton>
  </Stack>
</template>
