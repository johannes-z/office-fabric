<script setup lang="ts">
import type { IStackTokens } from '@fluentui-vue/components'
import { SearchBox, Stack } from '@fluentui-vue/components'
import { ref } from 'vue'

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 }

function onSearch(newValue: string) {
  console.log(`value is ${newValue}`)
}
</script>

<template>
  <Stack :tokens="stackTokens">
    <SearchBox placeholder="Search" @search="onSearch" />
    <SearchBox
      placeholder="Search with no animation"
      disable-animation
      @search="onSearch"
    />
  </Stack>
</template>
