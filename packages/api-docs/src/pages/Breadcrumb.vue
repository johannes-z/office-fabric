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
      <o-breadcrumb :items="items" />
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
    { text: 'Test 1', href: '#' },
    { text: 'Test 2', href: '#' },
    { text: 'Test 3', href: '#' },
    { text: 'Test 4', href: '#' },
    { text: 'Test 5', href: '#' },
    { text: 'Test 6', href: '#' },
  ]
}
</script>

<style lang="scss" module>
</style>
