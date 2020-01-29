<template>
  <div>
    <h1>OverflowSet</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <h2>OverflowSet Basic Example</h2>
      <f-overflow-set :items="items" :overflow-items="overflowItems">
        <template #item="{ item }">
          <f-link role="menuitem" :styles="{ root: { marginRight: 10 } }">
            {{ item.name }}
          </f-link>
        </template>

        <template #overflow="{ items }">
          <f-icon-button
            role="menuitem"
            title="More options"
            :styles="buttonStyles"
            :menu-icon-props="{ iconName: 'More' }"
            :menu-props="{ items }" />
        </template>
      </f-overflow-set>

      <h2>OverflowSet Vertical Example</h2>
      <f-overflow-set :items="items"
                      :overflow-items="overflowItems"
                      vertical>
        <template #item="{ item }">
          <f-command-bar-button
            role="menuitem"
            :styles="{ root: { padding: '10px' } }"
            :icon-props="{ iconName: item.icon }" />
        </template>

        <template #overflow="{ items }">
          <f-command-bar-button
            role="menuitem"
            title="More Items"
            :styles="{ root: { padding: '10px' }, menuIcon: { fontSize: '16px' } }"
            :menu-icon-props="{ iconName: 'More' }"
            :menu-props="{ items }" />
        </template>
      </f-overflow-set>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultPalette } from '@uifabric/styling'

@Component({
})
export default class OverflowSetPage extends Vue {
  items = [
    { key: 'item1', name: 'Link 1' },
    { key: 'item2', name: 'Link 2' },
    { key: 'item3', name: 'Link 3' },
  ]
  overflowItems = [
    { key: 'item4', name: 'Overflow Link 1' },
    { key: 'item5', name: 'Overflow Link 2' },
  ]
  buttonStyles = {
    root: {
      minWidth: 0,
      padding: '0 4px',
      alignSelf: 'stretch',
      height: 'auto',
    },
  }
}
</script>

<style lang="scss" module>
</style>
