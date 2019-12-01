<template>
  <div class="page">
    <div class="sidebar">
      <o-nav :groups="groups" />
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

import routes from '@/plugins/router/routes'
@Component({
  data () {
    return {
      groups: [
        {
          links: [{
            name: 'Basic Inputs',
            isExpanded: false,
            links: [
              { name: 'Button', href: '/#/Button' },
              { name: 'Checkbox', href: '/#/Checkbox' },
              { name: 'ChoiceGroup', href: '/#/ChoiceGroup' },
              { name: 'ComboBox', href: '/#/ComboBox' },
              { name: 'Dropdown', href: '/#/Dropdown' },
              { name: 'Label', href: '/#/Label' },
              { name: 'Link', href: '/#/Link' },
              { name: 'Rating', href: '/#/Rating' },
              { name: 'SearchBox', href: '/#/SearchBox' },
              { name: 'Slider', href: '/#/Slider' },
              { name: 'SpinButton', href: '/#/SpinButton' },
              { name: 'TextField', href: '/#/TextField' },
              { name: 'Toggle', href: '/#/Toggle' },
            ],
          }, {
            name: 'Items & Lists',
            isExpanded: false,
            links: [
              { name: 'ActivityItem', url: '/#/ActivityItem' },
              { name: 'Persona', url: '/#/Persona' },
            ],
          }, {
            name: 'Commands, Menus & Navs',
            isExpanded: false,
            links: [
              { name: 'Breadcrumb', href: '/#/Breadcrumb' },
            ],
          }, {
            name: 'Progress',
            isExpanded: false,
            links: [
              { name: 'ProgressIndicator', href: '/#/ProgressIndicator' },
              { name: 'Shimmer', href: '/#/Shimmer' },
              { name: 'Spinner', href: '/#/Spinner' },
            ],
          }, {
            name: 'Utilities',
            isExpanded: false,
            links: [
              { name: 'Icon', href: '/#/Icon' },
              { name: 'Image', href: '/#/Image' },
              { name: 'Layer', href: '/#/Layer' },
              { name: 'Overlay', href: '/#/Overlay' },
              { name: 'Separator', href: '/#/Separator' },
              { name: 'Text', href: '/#/Text' },
            ],
          }],
        },
      ],
    }
  },
})
export default class Preview extends Vue {
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
  margin-right: 10px;
  padding: 20px;
  overflow-y: auto;
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
