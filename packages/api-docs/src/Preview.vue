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
          { name: 'Button', key: 'Button', href: '/#/Button' },
          { name: 'Checkbox', key: 'Checkbox', href: '/#/Checkbox' },
          { name: 'ChoiceGroup', key: 'ChoiceGroup', href: '/#/ChoiceGroup' },
          { name: 'ComboBox', key: 'ComboBox', href: '/#/ComboBox' },
          { name: 'Dropdown', key: 'Dropdown', href: '/#/Dropdown' },
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
          { name: 'SwatchColorPicker', key: 'SwatchColorPicker', href: '/#/SwatchColorPicker' },
        ],
      }, {
        name: 'Items & Lists',
        isExpanded: true,
        links: [
          { name: 'ActivityItem', key: 'ActivityItem', href: '/#/ActivityItem' },
          { name: 'Facepile', key: 'Facepile', href: '/#/Facepile' },
          { name: 'Persona', key: 'Persona', href: '/#/Persona' },
        ],
      }, {
        name: 'Commands, Menus & Navs',
        isExpanded: true,
        links: [
          { name: 'Breadcrumb', key: 'Breadcrumb', href: '/#/Breadcrumb' },
          { name: 'OverflowSet', key: 'OverflowSet', href: '/#/OverflowSet' },
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
          { name: 'Shimmer', key: 'Shimmer', href: '/#/Shimmer', disabled: true },
          { name: 'Spinner', key: 'Spinner', href: '/#/Spinner' },
        ],
      }, {
        name: 'Surfaces',
        isExpanded: true,
        links: [
          { name: 'Callout', key: 'Callout', href: '/#/Callout' },
          { name: 'Dialog', key: 'Dialog', href: '/#/Dialog' },
          { name: 'Modal', key: 'Modal', href: '/#/Modal' },
          { name: 'Panel', key: 'Panel', href: '/#/Panel' },
        ],
      }, {
        name: 'Utilities',
        isExpanded: true,
        links: [
          { name: 'Icon', key: 'Icon', href: '/#/Icon' },
          { name: 'Image', key: 'Image', href: '/#/Image' },
          { name: 'Layer', key: 'Layer', href: '/#/Layer' },
          { name: 'Overlay', key: 'Overlay', href: '/#/Overlay' },
          { name: 'ResizeGroup', key: 'ResizeGroup', href: '/#/ResizeGroup' },
          { name: 'Separator', key: 'Separator', href: '/#/Separator' },
          { name: 'Stack', key: 'Stack', href: '/#/Stack' },
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
