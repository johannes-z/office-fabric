<script setup lang="ts">
import { ref } from 'vue'
import { SearchBox } from '../components'
</script>

<template>
  <h1>SearchBox</h1>
  <SearchBox placeholder="Search" />
  <SearchBox
    placeholder="Search with no animation"
    disable-animation
  />
</template>
