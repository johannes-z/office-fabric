<script setup lang="ts">
import { ref } from 'vue'
import { SearchBox } from '../components'

const search = ref('test')
</script>

<template>
  <h1>SearchBox</h1>
  <SearchBox placeholder="Search" v-model="search" />
  {{  search }}
  <SearchBox
    placeholder="Search with no animation"
    disable-animation
  />
</template>
