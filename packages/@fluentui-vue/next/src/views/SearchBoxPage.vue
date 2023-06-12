<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IIconProps, IStackTokens } from '../components'
import { SearchBox, Stack } from '../components'
import DocSection from './components/DocSection.vue'
import type { ISearchBox } from '@/components/SearchBox/SearchBox.types'

const search = ref('test')
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 }
const filterIcon: IIconProps = { iconName: 'Filter' }

const componentRef = ref<ISearchBox | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})
</script>

<template>
  <h1>SearchBox</h1>

  <DocSection>
    <h2>Usage</h2>

    <h3>Default SearchBox</h3>
    <SearchBox ref="componentRef" v-model="search" placeholder="Search" />
    <SearchBox
      placeholder="Search with no animation"
      disable-animation
    />

    <h3>Underlined SearchBox</h3>
    <SearchBox underlined placeholder="Search" />

    <h3>Disabled SearchBox</h3>
    <Stack :tokens="stackTokens">
      <SearchBox placeholder="Search" disabled />
      <SearchBox placeholder="Search" underlined disabled />
    </Stack>

    <h3>SearchBox with custom icon</h3>
    <SearchBox placeholder="Filter" :icon-props="filterIcon" />
  </DocSection>
</template>
