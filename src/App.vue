<template>
  <div id="app">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toggle from './components/Toggle/Toggle.vue'

@Component({
  components: {
    Toggle
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
:root {
  --main-text-disabled: #a19f9d;
  --main-text-error: #a4262c;

  --primary-themeDarker: #004377;
  --primary-themeDark: #005ba1;
  --primary-themeDarkAlt: #006cbe;
  --primary-themePrimary: #0078d4;
  --primary-themeSecondary: #1a86d9;
  --primary-themeTertiary: #5ca9e5;
  --primary-themeLight: #a9d3f2;
  --primary-themeLighter: #d0e7f8;
  --primary-themeLighterAlt: #f3f9fd;

  --foreground-black: #494847;
  --foreground-neutralDark: #605e5d;
  --foreground-neutralPrimary: #323130;
  --foreground-neutralPrimaryAlt: #8d8b8a;
  --foreground-neutralSecondary: #a3a2a0;
  --foreground-neutralTertiary: #bab8b7;
  --foreground-white: #ffffff;

  --background-neutralTertiaryAlt: #c8c8c8;
  --background-neutralDark: #605e5d;
  --background-neutralQuaternaryAlt: #dadada;
  --background-neutralLight: #eaeaea;
  --background-neutralLighter: #f4f4f4;
  --background-neutralLighterAlt: #f8f8f8;
}
// @import "./sass/Fabric";
</style>
