<template>
  <div>
    <h1>Tag Picker</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <TagPicker />
      <TagPicker disabled />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue-demi'
import { TagPicker } from '@uifabric-vue/office-ui-fabric-vue'

export default Vue.extend({
  name: 'TagPickerPage',

  components: {
    TagPicker,
  },
})

</script>
