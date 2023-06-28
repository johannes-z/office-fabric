<script setup lang="ts">
import { ref } from 'vue'
import type { IStackTokens } from '@fluentui-vue/components'
import { Stack, Toggle } from '@fluentui-vue/components'

const stackTokens: IStackTokens = { childrenGap: 10 }

const buttonStyles = {
  root: {
    background: 'transparent',
    border: 'none',
    minWidth: '16px',
    padding: 0,
  },
}

function onChange(value: boolean) {
  console.log(value)
}
</script>

<template>
  <Stack :tokens="stackTokens">
    <Toggle on-text="on" off-text="off" @change="onChange">
      <template #label>
        <div>Custom label (iconWithTooltip)</div>
      </template>
    </Toggle>
    <Toggle inline-label on-text="on" off-text="off" @change="onChange">
      <template #label>
        <div>Custom label (iconWithTooltip)</div>
      </template>
    </Toggle>
  </Stack>
</template>
