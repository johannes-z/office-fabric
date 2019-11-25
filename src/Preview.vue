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
        <component :is="activePage"
                   v-if="Object.keys(activePage).length > 0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ImagePage from './pages/Image.vue'
import LabelPage from './pages/Label.vue'
import SeparatorPage from './pages/Separator.vue'
import ButtonPage from './pages/Button.vue'
import TogglePage from './pages/Toggle.vue'
import TextFieldPage from './pages/TextField.vue'
import SpinButtonPage from './pages/SpinButton.vue'
import CheckboxPage from './pages/Checkbox.vue'
import ProgressIndicatorPage from './pages/ProgressIndicator.vue'
import SpinnerPage from './pages/Spinner.vue'
import TextPage from './pages/Text.vue'
import ChoiceGroupPage from './pages/ChoiceGroup.vue'
import NavPage from './pages/Nav.vue'
import SliderPage from './pages/Slider.vue'

import FabricNav from './components/Nav/Nav.vue'

const components = [
  'Button',
  'Checkbox',
  'Label',
  'SpinButton',
  'TextField',
  'Toggle',
  'Text',
  'ChoiceGroup',
  'Image',
  'Separator',
  'Nav',
  'ProgressIndicator',
  'Spinner',
  'Slider',
]

@Component({
  components: { FabricNav, LabelPage },
  data () {
    return {
      activePage: () => import('./pages/Slider.vue'),
      groups: [{
        links: components.map(component => ({
          name: component,
          onLinkClick: () => (this.activePage = () => import(`./pages/${component}.vue`)),
        })),
      }],
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
