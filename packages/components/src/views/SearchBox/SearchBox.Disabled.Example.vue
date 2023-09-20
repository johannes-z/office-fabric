<script setup lang="ts">
import type { IStackTokens } from '@fluentui-vue/components'
import { SearchBox, Stack } from '@fluentui-vue/components'

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 }
</script>

<template>
  <Stack :tokens="stackTokens">
    <SearchBox placeholder="Search" disabled />
    <SearchBox
      placeholder="Search with no animation"
      underlined
      disabled
    />
  </Stack>
</template>
