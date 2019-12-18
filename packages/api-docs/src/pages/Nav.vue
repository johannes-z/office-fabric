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
          href: 'http://example.com',
          expandAriaLabel: 'Expand Home section',
          collapseAriaLabel: 'Collapse Home section',
          links: [
            {
              name: 'Activity',
              href: 'http://msn.com',
              key: 'key1',
              target: '_blank',
            },
            {
              name: 'MSN',
              href: 'http://msn.com',
              disabled: true,
              key: 'key2',
              target: '_blank',
            },
          ],
          isExpanded: true,
        },
        {
          name: 'Documents',
          href: 'http://example.com',
          key: 'key3',
          isExpanded: true,
          target: '_blank',
        },
        {
          name: 'Pages',
          href: 'http://msn.com',
          key: 'key4',
          target: '_blank',
        },
        {
          name: 'Notebook',
          href: 'http://msn.com',
          key: 'key5',
          disabled: true,
        },
        {
          name: 'Communication and Media',
          href: 'http://msn.com',
          key: 'key6',
          target: '_blank',
        },
        {
          name: 'News',
          href: 'http://cnn.com',
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
