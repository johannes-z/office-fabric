<script setup lang="ts">
import type { IStackTokens } from '@fluentui-vue/components'
import { SearchBox, Stack } from '@fluentui-vue/components'
import { ref } from 'vue'
import type { ISearchBoxStyles } from '@/components/SearchBox/SearchBox.types'

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } }

function onClear() {
  console.log('Custom onClear Called')
}
function onEscape() {
  console.log('Custom onEscape Called')
}
function onChange(_, newValue: string) {
  console.log(`SearchBox onChange fired: ${newValue}`)
}
function onSearch(newValue: string) {
  console.log(`SearchBox onSearch fired: ${newValue}`)
}
</script>

<template>
  <SearchBox
    placeholder="Search" :styles="searchBoxStyles"
    @clear="onClear"
    @escape="onEscape"
    @change="onChange"
    @search="onSearch"
  />
</template>
