<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IIconProps, IStackTokens } from '../components'
import { SearchBox, Stack } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
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

  <DocSection title="Usage">
    <ExampleCard title="Default SearchBox">
      <Stack :tokens="stackTokens">
        <SearchBox ref="componentRef" v-model="search" placeholder="Search" />
        <SearchBox
          placeholder="Search with no animation"
          disable-animation
        />
      </Stack>
    </ExampleCard>
    <ExampleCard title="Underlined SearchBox">
      <SearchBox underlined placeholder="Search" />
    </ExampleCard>
    <ExampleCard title="Disabled SearchBoxes">
      <Stack :tokens="stackTokens">
        <SearchBox placeholder="Search" disabled />
        <SearchBox placeholder="Search" underlined disabled />
      </Stack>
    </ExampleCard>
    <ExampleCard title="SearchBox with custom icon">
      <SearchBox placeholder="Filter" :icon-props="filterIcon" />
    </ExampleCard>
  </DocSection>
</template>
