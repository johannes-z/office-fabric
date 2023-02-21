<template>
  <div>
    This is a test message

    <SearchBox :value="search" disabled />
    {{ search }}

    <p v-if="showMore" :key="search">
      Additional content
      Additional content
      Additional content
      Additional content
      Additional content
      Additional content
      Additional content
      Additional content
      Additional content
      {{ +new Date() }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue-demi'
import { SearchBox } from '@uifabric-vue/office-ui-fabric-vue'

export default Vue.extend({
  components: {
    SearchBox,
  },

  props: {
    search: { type: String, default: '' },
  },

  computed: {
    showMore (): boolean {
      return this.search.length > 5
    },
  },
})
</script>
