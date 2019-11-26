<template>
  <div class="page">
    <div class="sidebar">
      <b>Basic Inputs</b>
      <div @click="activePage = components.ButtonPage">Button</div>
      <div @click="activePage = components.LabelPage">Label</div>
      <div @click="activePage = components.CheckboxPage">Checkbox</div>
      <div @click="activePage = components.SpinButtonPage">SpinButton</div>
      <div @click="activePage = components.TextFieldPage">TextField</div>
      <div @click="activePage = components.TogglePage">Toggle</div>
      <div @click="activePage = components.TextPage">Text</div>

      <div @click="activePage = components.ImagePage">Image</div>
      <div @click="activePage = components.SeparatorPage">Separator</div>

      <b>Progress</b>
      <div @click="activePage = components.ProgressIndicatorPage">ProgressIndicator</div>
      <div @click="activePage = components.SpinnerPage">Spinner</div>
      <div @click="activePage = components.SearchBox">SearchBox</div>
    </div>
    <div class="content">
      <div class="">
        <component :is="activePage"
                   v-if="activePage" />
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
import SearchBox from './pages/SearchBox.vue'

@Component
export default class Preview extends Vue {
  components: any = {
    ButtonPage,
    SeparatorPage,
    ImagePage,
    LabelPage,
    TogglePage,
    TextFieldPage,
    SpinButtonPage,
    CheckboxPage,
    ProgressIndicatorPage,
    SpinnerPage,
    TextPage,
    SearchBox,
  }
  activePage: any = SearchBox
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
