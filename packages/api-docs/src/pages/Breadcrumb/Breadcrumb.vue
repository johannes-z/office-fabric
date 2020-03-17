<template>
  <div>
    <h1>Breadcrumb</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Breadcrumb</h2>
      <f-breadcrumb :items="items" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IBreadcrumbItem } from '@uifabric-vue/office-ui-fabric-vue'

@Component
export default class BreadcrumbPage extends Vue {
  items: IBreadcrumbItem[] = [
    { text: 'Files', onClick: this.onItemClicked },
    { text: 'Folder 2', onClick: this.onItemClicked },
    { text: 'Folder 3', onClick: this.onItemClicked },
    { text: 'Folder 4 (non-clickable)' },
    { text: 'Folder 5', onClick: this.onItemClicked },
    { text: 'Folder 6', onClick: this.onItemClicked },
  ]

  onItemClicked (event: MouseEvent, item: any) {
    console.log(item)
  }
}
</script>

<style lang="scss" module>
</style>
