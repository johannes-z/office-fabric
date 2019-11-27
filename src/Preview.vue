<template>
  <div class="page">
    <div class="sidebar">
      <FabricNav :groups="groups" />
      <!-- <b>Basic Inputs</b>
      <div @click="activePage = components.ButtonPage">Button</div>
      <div @click="activePage = components.LabelPage">Label</div>
      <div @click="activePage = components.CheckboxPage">Checkbox</div>
      <div @click="activePage = components.SpinButtonPage">SpinButton</div>
      <div @click="activePage = components.TextFieldPage">TextField</div>
      <div @click="activePage = components.TogglePage">Toggle</div>
      <div @click="activePage = components.TextPage">Text</div>
      <div @click="activePage = components.ChoiceGroupPage">ChoiceGroup</div>

      <div @click="activePage = components.ImagePage">Image</div>
      <div @click="activePage = components.SeparatorPage">Separator</div>
      <div @click="activePage = components.NavPage">Nav</div>

      <b>Progress</b>
      <div @click="activePage = components.ProgressIndicatorPage">ProgressIndicator</div>
      <div @click="activePage = components.SpinnerPage">Spinner</div>
      <div @click="activePage = components.SliderPage">Slider</div> -->
    </div>
    <div class="content">
      <div class="">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import FabricNav from './components/Nav/Nav.vue'

import routes from '@/router/routes'
@Component({
  components: { FabricNav },
  data () {
    return {
      groups: [
        {
          links: [{
            name: 'Basic Inputs',
            isExpanded: false,
            links: [
              { name: 'Button', onClick: () => this.$router.push({ path: 'Button' }) },
              { name: 'Checkbox', onClick: () => this.$router.push({ path: 'Checkbox' }) },
              { name: 'ChoiceGroup', onClick: () => this.$router.push({ path: 'ChoiceGroup' }) },
              { name: 'ComboBox', onClick: () => this.$router.push({ path: 'ComboBox' }) },
              { name: 'Dropdown', onClick: () => this.$router.push({ path: 'Dropdown' }) },
              { name: 'Label', onClick: () => this.$router.push({ path: 'Label' }) },
              { name: 'Link', onClick: () => this.$router.push({ path: 'Link' }) },
              { name: 'Rating', onClick: () => this.$router.push({ path: 'Rating' }) },
              { name: 'SearchBox', onClick: () => this.$router.push({ path: 'SearchBox' }) },
              { name: 'Slider', onClick: () => this.$router.push({ path: 'Slider' }) },
              { name: 'SpinButton', onClick: () => this.$router.push({ path: 'SpinButton' }) },
              { name: 'TextField', onClick: () => this.$router.push({ path: 'TextField' }) },
              { name: 'Toggle', onClick: () => this.$router.push({ path: 'Toggle' }) },
            ],
          }, {
            name: 'Progress',
            isExpanded: false,
            links: [
              { name: 'ProgressIndicator', onClick: () => this.$router.push({ path: 'ProgressIndicator' }) },
              { name: 'Spinner', onClick: () => this.$router.push({ path: 'Spinner' }) },
            ],
          }, {
            name: 'Utilities',
            isExpanded: false,
            links: [
              { name: 'Icon', onClick: () => this.$router.push({ path: 'Icon' }) },
              { name: 'Image', onClick: () => this.$router.push({ path: 'Image' }) },
              { name: 'Layer', onClick: () => this.$router.push({ path: 'Layer' }) },
              { name: 'Separator', onClick: () => this.$router.push({ path: 'Separator' }) },
              { name: 'Text', onClick: () => this.$router.push({ path: 'Text' }) },
            ],
          }],
        },
      ],
      // groups: [{
      //   links: routes.map(route => ({
      //     name: route.name,
      //     // disabled: route.name === this.$route.name,
      //     onClick: () => this.$router.push({ path: route.path }),
      //   })),
      // }],
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
