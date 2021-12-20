<template>
  <div>
    <h1>SearchBox</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>Default SearchBox</h2>
      <f-stack :tokens="{ childrenGap: 20 }">
        <f-search-box />
        <f-search-box disable-animation placeholder="Search with no animation" />
      </f-stack>

      <h2>Underlined SearchBox</h2>
      <f-search-box underlined placeholder="Search" />

      <h2>Disabled SearchBox</h2>
      <f-stack :tokens="{ childrenGap: 20 }">
        <f-search-box disabled />
        <f-search-box disabled
                      underlined
                      placeholder="Search" />
      </f-stack>

      <h2>SearchBox with custom icon</h2>
      <f-search-box placeholder="Filter" :icon-props="{ iconName: 'Filter' }" />

      <h2>SearchBox with fixed width and custom event handling</h2>
      <f-search-box :styles="{ root: { width: 200 } }"
                    placeholder="Search"
                    @clear="onClear"
                    @search="onSearch"
                    @change="onChange"
                    @focus="onFocus"
                    @blur="onBlur"
                    @escape.prevent="onEscape" />
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
  onClear (e: Event) {
    console.log('clear')
  }

  onChange (val: string) {
    console.log('Current value: ' + val)
  }

  onSearch (val: string) {
    console.log('Search with value: ' + val)
  }

  onFocus (e: FocusEvent) {
    console.log('focus')
  }

  onBlur (e: FocusEvent) {
    console.log('blur')
  }

  onEscape (e: KeyboardEvent) {
    console.log('escape')
  }
}
</script>

<style lang="scss" module>
</style>
