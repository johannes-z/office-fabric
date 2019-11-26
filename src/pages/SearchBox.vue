<template>
  <div>
    <h1>SearchBox</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <SearchBox>Test</SearchBox>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SearchBox from '@/components/SearchBox/SearchBox.vue'

@Component({
  components: {
    SearchBox,
  },
})
export default class SearchBoxPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
