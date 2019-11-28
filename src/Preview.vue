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

import routes from '@/router/routes'
@Component({
  data () {
    return {
      groups: [
        {
          links: [{
            name: 'Basic Inputs',
            isExpanded: false,
            links: [
              { name: 'Button', url: '/#/Button' },
              { name: 'Checkbox', url: '/#/Checkbox' },
              { name: 'ChoiceGroup', url: '/#/ChoiceGroup' },
              { name: 'ComboBox', url: '/#/ComboBox' },
              { name: 'Dropdown', url: '/#/Dropdown' },
              { name: 'Label', url: '/#/Label' },
              { name: 'Link', url: '/#/Link' },
              { name: 'Rating', url: '/#/Rating' },
              { name: 'SearchBox', url: '/#/SearchBox' },
              { name: 'Slider', url: '/#/Slider' },
              { name: 'SpinButton', url: '/#/SpinButton' },
              { name: 'TextField', url: '/#/TextField' },
              { name: 'Toggle', url: '/#/Toggle' },
            ],
          }, {
            name: 'Commands, Menus & Navs',
            isExpanded: false,
            links: [
              { name: 'Breadcrumb', url: '/#/Breadcrumb' },
            ],
          }, {
            name: 'Progress',
            isExpanded: false,
            links: [
              { name: 'ProgressIndicator', url: '/#/ProgressIndicator' },
              { name: 'Spinner', url: '/#/Spinner' },
            ],
          }, {
            name: 'Utilities',
            isExpanded: false,
            links: [
              { name: 'Icon', url: '/#/Icon' },
              { name: 'Image', url: '/#/Image' },
              { name: 'Layer', url: '/#/Layer' },
              { name: 'Overlay', url: '/#/Overlay' },
              { name: 'Separator', url: '/#/Separator' },
              { name: 'Text', url: '/#/Text' },
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
