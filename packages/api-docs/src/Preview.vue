<template>
  <div class="page">
    <div class="sidebar">
      <f-nav :groups="groups" />
    </div>
    <div class="content">
      <div class="">
        <router-view v-bind="null" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Preview extends Vue {
  groups = [
    {
      links: [{
        name: 'Basic Inputs',
        isExpanded: true,
        links: [
          { name: 'Button WIP', key: 'Button', href: '/#/Button' },
          { name: 'Checkbox WIP', key: 'Checkbox', href: '/#/Checkbox' },
          { name: 'ChoiceGroup', key: 'ChoiceGroup', href: '/#/ChoiceGroup' },
          { name: 'ComboBox WIP', key: 'ComboBox', href: '/#/ComboBox' },
          { name: 'Dropdown WIP', key: 'Dropdown', href: '/#/Dropdown' },
          { name: 'Label', key: 'Label', href: '/#/Label' },
          { name: 'Link', key: 'Link', href: '/#/Link' },
          { name: 'Rating', key: 'Rating', href: '/#/Rating' },
          { name: 'SearchBox', key: 'SearchBox', href: '/#/SearchBox' },
          { name: 'Slider', key: 'Slider', href: '/#/Slider' },
          { name: 'SpinButton', key: 'SpinButton', href: '/#/SpinButton' },
          { name: 'TextField', key: 'TextField', href: '/#/TextField' },
          { name: 'Toggle', key: 'Toggle', href: '/#/Toggle' },
        ],
      }, {
        name: 'Galleries & Pickers',
        isExpanded: true,
        links: [
          { name: 'SwatchColorPicker WIP', key: 'SwatchColorPicker', href: '/#/SwatchColorPicker' },
        ],
      }, {
        name: 'Items & Lists',
        isExpanded: true,
        links: [
          { name: 'ActivityItem WIP', key: 'ActivityItem', href: '/#/ActivityItem' },
          { name: 'Facepile WIP', key: 'Facepile', href: '/#/Facepile' },
          { name: 'Persona WIP', key: 'Persona', href: '/#/Persona' },
        ],
      }, {
        name: 'Commands, Menus & Navs',
        isExpanded: true,
        links: [
          { name: 'Breadcrumb WIP', key: 'Breadcrumb', href: '/#/Breadcrumb' },
          { name: 'OverflowSet WIP', key: 'OverflowSet', href: '/#/OverflowSet' },
        ],
      }, {
        name: 'Notification & Engagement',
        isExpanded: true,
        links: [
          { name: 'MessageBar', key: 'MessageBar', href: '/#/MessageBar' },
        ],
      }, {
        name: 'Progress',
        isExpanded: true,
        links: [
          { name: 'ProgressIndicator', key: 'ProgressIndicator', href: '/#/ProgressIndicator' },
          { name: 'Shimmer WIP', key: 'Shimmer', href: '/#/Shimmer', disabled: true },
          { name: 'Spinner', key: 'Spinner', href: '/#/Spinner' },
        ],
      }, {
        name: 'Surfaces',
        isExpanded: true,
        links: [
          { name: 'Callout WIP', key: 'Callout', href: '/#/Callout' },
          { name: 'Dialog WIP', key: 'Dialog', href: '/#/Dialog' },
          { name: 'Modal WIP', key: 'Modal', href: '/#/Modal' },
          { name: 'Panel WIP', key: 'Panel', href: '/#/Panel' },
        ],
      }, {
        name: 'Utilities',
        isExpanded: true,
        links: [
          { name: 'Icon WIP', key: 'Icon', href: '/#/Icon' },
          { name: 'Image WIP', key: 'Image', href: '/#/Image' },
          { name: 'Layer', key: 'Layer', href: '/#/Layer' },
          { name: 'Overlay', key: 'Overlay', href: '/#/Overlay' },
          { name: 'ResizeGroup', key: 'ResizeGroup', href: '/#/ResizeGroup' },
          { name: 'Separator', key: 'Separator', href: '/#/Separator' },
          { name: 'Stack WIP', key: 'Stack', href: '/#/Stack' },
          { name: 'Text', key: 'Text', href: '/#/Text' },
        ],
      }],
    },
  ]
}
</script>

<style lang="scss">
body {
  margin: 0;
}
.page {
  background: #f4f4f4;
  display: flex;
  min-height: 100vh;
}
.sidebar {
  position: fixed;
  background: white;
  box-sizing: border-box;
  width: 300px;
  top: 0;
  bottom: 0;
  padding: 20px;
  margin-right: 10px;
  overflow-y: scroll;
}
.content {
  flex: 1;
  margin-left: 300px;
  padding-left: 40px;
  padding-right: 40px;
  overflow: hidden;
}
.content--inner {
  background: white;
  padding: 28px;
  margin: 20px 0;
}

</style>
