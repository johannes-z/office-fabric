<script setup lang="ts">
import type { IStackTokens } from '@fluentui-vue/components'
import { Stack, Toggle } from '@fluentui-vue/components'
import { ref } from 'vue'

const stackTokens: IStackTokens = { childrenGap: 10 }

const value = ref(true)
function onChange(ev: PointerEvent, value?: boolean) {
  console.log(value)
}
</script>

<template>
  <Stack :tokens="stackTokens">
    <Toggle v-model="value" label="Enabled and checked" on-text="On" off-text="Off" />

    <Toggle label="Enabled and unchecked" on-text="On" off-text="Off" @change="onChange" />

    <Toggle label="Disabled and checked" disabled on-text="On" off-text="Off" />

    <Toggle label="Disabled and unchecked" disabled on-text="On" off-text="Off" />

    <Toggle label="With inline label" inline-label on-text="On" off-text="Off" />

    <Toggle label="Disabled with inline label" inline-label disabled on-text="On" off-text="Off" />

    <Toggle label="With inline label and without onText and offText" inline-label />

    <Toggle label="Disabled with inline label and without onText and offText" inline-label disabled />

    <Toggle
      v-model="value"
      label="Enabled and checked (ARIA 1.0 compatible)"
      on-text="On"
      off-text="Off"
      role="checkbox"
    />

    <Toggle v-model="value">
      <template #label>
        Controlled with custom label template
      </template>
    </Toggle>
  </Stack>
</template>
