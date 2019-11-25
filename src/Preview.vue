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
      activePage: () => import('./pages/Slider.vue'),
      groups: [{
        links: routes.map(route => ({
          name: route.name,
          onLinkClick: () => this.$router.push({ path: route.path }),
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
