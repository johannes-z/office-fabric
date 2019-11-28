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
              { name: 'Button', onClick: () => this.$router.push('Button') },
              { name: 'Checkbox', onClick: () => this.$router.push('Checkbox') },
              { name: 'ChoiceGroup', onClick: () => this.$router.push('ChoiceGroup') },
              { name: 'ComboBox', onClick: () => this.$router.push('ComboBox') },
              { name: 'Dropdown', onClick: () => this.$router.push('Dropdown') },
              { name: 'Label', onClick: () => this.$router.push('Label') },
              { name: 'Link', onClick: () => this.$router.push('Link') },
              { name: 'Rating', onClick: () => this.$router.push('Rating') },
              { name: 'SearchBox', onClick: () => this.$router.push('SearchBox') },
              { name: 'Slider', onClick: () => this.$router.push('Slider') },
              { name: 'SpinButton', onClick: () => this.$router.push('SpinButton') },
              { name: 'TextField', onClick: () => this.$router.push('TextField') },
              { name: 'Toggle', onClick: () => this.$router.push('Toggle') },
            ],
          }, {
            name: 'Progress',
            isExpanded: false,
            links: [
              { name: 'ProgressIndicator', onClick: () => this.$router.push('ProgressIndicator') },
              { name: 'Spinner', onClick: () => this.$router.push('Spinner') },
            ],
          }, {
            name: 'Utilities',
            isExpanded: false,
            links: [
              { name: 'Icon', onClick: () => this.$router.push('Icon') },
              { name: 'Image', onClick: () => this.$router.push('Image') },
              { name: 'Layer', onClick: () => this.$router.push('Layer') },
              { name: 'Separator', onClick: () => this.$router.push('Separator') },
              { name: 'Text', onClick: () => this.$router.push('Text') },
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
