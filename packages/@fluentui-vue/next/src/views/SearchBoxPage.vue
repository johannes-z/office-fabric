<script setup lang="ts">
import { ref } from 'vue'
import type { IIconProps, IStackTokens } from '../components'
import { SearchBox, Stack } from '../components'
import DocumentCard from './components/DocumentCard.vue'

const search = ref('test')
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 }
const filterIcon: IIconProps = { iconName: 'Filter' }
</script>

<template>
  <h1>SearchBox</h1>

  <DocumentCard>
    <h2>Usage</h2>

    <h3>Default SearchBox</h3>
    <SearchBox v-model="search" placeholder="Search" />
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
  </DocumentCard>
</template>
