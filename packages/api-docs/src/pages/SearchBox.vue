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
      <h2>Default SearchBox</h2>
      <f-search-box />
      <f-search-box disable-animation placeholder="Search with no animation" />
      <h2>Underlined SearchBox</h2>
      <f-search-box underlined placeholder="Search" />
      <h2>Disabled SearchBox</h2>
      <f-search-box disabled />
      <f-search-box disabled
                    underlined
                    placeholder="Search" />
      <h2>SearchBox with custom icon</h2>
      <f-search-box placeholder="Filter" icon-name="Filter" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class SearchBoxPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
