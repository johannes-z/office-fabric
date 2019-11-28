<template>
  <div>
    <h1>Nav</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <o-nav :groups="groups" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NavPage extends Vue {
  groups = [
    {
      links: [
        {
          name: 'Home',
          url: 'http://example.com',
          expandAriaLabel: 'Expand Home section',
          collapseAriaLabel: 'Collapse Home section',
          links: [
            {
              name: 'Activity',
              url: 'http://msn.com',
              key: 'key1',
              target: '_blank',
            },
            {
              name: 'MSN',
              url: 'http://msn.com',
              disabled: true,
              key: 'key2',
              target: '_blank',
            },
          ],
          isExpanded: true,
        },
        {
          name: 'Documents',
          url: 'http://example.com',
          key: 'key3',
          isExpanded: true,
          target: '_blank',
        },
        {
          name: 'Pages',
          url: 'http://msn.com',
          key: 'key4',
          target: '_blank',
        },
        {
          name: 'Notebook',
          url: 'http://msn.com',
          key: 'key5',
          disabled: true,
        },
        {
          name: 'Communication and Media',
          url: 'http://msn.com',
          key: 'key6',
          target: '_blank',
        },
        {
          name: 'News',
          url: 'http://cnn.com',
          icon: 'News',
          key: 'key7',
          target: '_blank',
        },
      ],
    },
  ]
}
</script>

<style lang="scss" module>
</style>
