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

const publicPath = process.env.NODE_ENV === 'production'
  ? '/office-fabric'
  : ''

@Component
export default class Preview extends Vue {
  groups = [
    {
      links: [{
        name: 'Basic Inputs',
        isExpanded: true,
        links: [
          { name: 'Button WIP', key: 'Button', href: publicPath + '/#/Button' },
          { name: 'Checkbox WIP', key: 'Checkbox', href: publicPath + '/#/Checkbox' },
          { name: 'ChoiceGroup', key: 'ChoiceGroup', href: publicPath + '/#/ChoiceGroup' },
          { name: 'ComboBox WIP', key: 'ComboBox', href: publicPath + '/#/ComboBox' },
          { name: 'Dropdown WIP', key: 'Dropdown', href: publicPath + '/#/Dropdown' },
          { name: 'Label', key: 'Label', href: publicPath + '/#/Label' },
          { name: 'Link', key: 'Link', href: publicPath + '/#/Link' },
          { name: 'Rating', key: 'Rating', href: publicPath + '/#/Rating' },
          { name: 'SearchBox', key: 'SearchBox', href: publicPath + '/#/SearchBox' },
          { name: 'Slider', key: 'Slider', href: publicPath + '/#/Slider' },
          { name: 'SpinButton', key: 'SpinButton', href: publicPath + '/#/SpinButton' },
          { name: 'TextField', key: 'TextField', href: publicPath + '/#/TextField' },
          { name: 'Toggle', key: 'Toggle', href: publicPath + '/#/Toggle' },
        ],
      }, {
        name: 'Galleries & Pickers',
        isExpanded: true,
        links: [
          { name: 'SwatchColorPicker WIP', key: 'SwatchColorPicker', href: publicPath + '/#/SwatchColorPicker' },
        ],
      }, {
        name: 'Items & Lists',
        isExpanded: true,
        links: [
          { name: 'ActivityItem WIP', key: 'ActivityItem', href: publicPath + '/#/ActivityItem' },
          { name: 'Facepile WIP', key: 'Facepile', href: publicPath + '/#/Facepile' },
          { name: 'Persona WIP', key: 'Persona', href: publicPath + '/#/Persona' },
        ],
      }, {
        name: 'Commands, Menus & Navs',
        isExpanded: true,
        links: [
          { name: 'Breadcrumb WIP', key: 'Breadcrumb', href: publicPath + '/#/Breadcrumb' },
          { name: 'OverflowSet WIP', key: 'OverflowSet', href: publicPath + '/#/OverflowSet' },
        ],
      }, {
        name: 'Notification & Engagement',
        isExpanded: true,
        links: [
          { name: 'MessageBar', key: 'MessageBar', href: publicPath + '/#/MessageBar' },
        ],
      }, {
        name: 'Progress',
        isExpanded: true,
        links: [
          { name: 'ProgressIndicator', key: 'ProgressIndicator', href: publicPath + '/#/ProgressIndicator' },
          { name: 'Shimmer WIP', key: 'Shimmer', href: publicPath + '/#/Shimmer', disabled: true },
          { name: 'Spinner', key: 'Spinner', href: publicPath + '/#/Spinner' },
        ],
      }, {
        name: 'Surfaces',
        isExpanded: true,
        links: [
          { name: 'Callout WIP', key: 'Callout', href: publicPath + '/#/Callout' },
          { name: 'Dialog WIP', key: 'Dialog', href: publicPath + '/#/Dialog' },
          { name: 'Modal WIP', key: 'Modal', href: publicPath + '/#/Modal' },
          { name: 'Panel WIP', key: 'Panel', href: publicPath + '/#/Panel' },
        ],
      }, {
        name: 'Utilities',
        isExpanded: true,
        links: [
          { name: 'Icon WIP', key: 'Icon', href: publicPath + '/#/Icon' },
          { name: 'Image WIP', key: 'Image', href: publicPath + '/#/Image' },
          { name: 'Layer', key: 'Layer', href: publicPath + '/#/Layer' },
          { name: 'Overlay', key: 'Overlay', href: publicPath + '/#/Overlay' },
          { name: 'ResizeGroup', key: 'ResizeGroup', href: publicPath + '/#/ResizeGroup' },
          { name: 'Separator', key: 'Separator', href: publicPath + '/#/Separator' },
          { name: 'Stack WIP', key: 'Stack', href: publicPath + '/#/Stack' },
          { name: 'Text', key: 'Text', href: publicPath + '/#/Text' },
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
