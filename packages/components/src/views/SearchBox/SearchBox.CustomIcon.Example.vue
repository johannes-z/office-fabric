<script setup lang="ts">
import type { IIconProps, IStackTokens } from '@fluentui-vue/components'
import { SearchBox } from '@fluentui-vue/components'

const filterIcon: IIconProps = { iconName: 'Filter' }
</script>

<template>
  <SearchBox placeholder="Filter" :icon-props="filterIcon" />
</template>
