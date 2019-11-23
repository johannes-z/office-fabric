<template>
  <div id="app">
    <Icon icon-name="Attach" />
    <Icon icon-name="Upload" />
    <Icon icon-name="Upload" style="color: salmon" />

    <hr>

    <Label>Test</Label>
    <Label disabled>Test</Label>
    <Label required>Test</Label>
    <Label disabled required>Test</Label>

    <Label required for="label-test-1">Label</Label>
    <input type="text" id="label-test-1">

    <hr>

    asdf <Link href="http://google.at">Google</Link>
    asdf <Link>Google</Link>
    asdf <Link href="http://google.at" disabled>Google</Link>

    <hr>

    <Separator>Test</Separator>
    <Separator align-content="start">Start</Separator>
    <Separator align-content="end">End</Separator>
    <Separator />

    <div style="height: 200px;">
      <Separator vertical>Test</Separator>
      <Separator vertical align-content="start">Test</Separator>
      <Separator vertical align-content="end">Test</Separator>
      <Separator vertical />
    </div>

    <Separator><Icon icon-name="Attach" /></Separator>

    <hr>

    <FImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and no height or width is specified." />
    <FImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and only width is specified."
      width="600" />
    <FImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and only height is specified."
      height="100" />
    <FImage
      src="http://placehold.it/350x150"
      alt="Example implementation with no image fit property and height or width is specified."
      width="100"
      height="100" />

    <hr>

    <DefaultButton>Test</DefaultButton>
    <DefaultButton primary>Test</DefaultButton>
    <DefaultButton disabled>Test</DefaultButton>
    <DefaultButton disabled primary>Test</DefaultButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Icon from './components/Icon/Icon.vue'
import Label from './components/Label/Label.vue'
import Link from './components/Link/Link.vue'
import Separator from './components/Separator/Separator.vue'
import FImage from './components/Image/Image.vue'
import DefaultButton from './components/Button/DefaultButton.vue'

@Component({
  components: {
    Icon,
    Label,
    Link,
    Separator,
    FImage,
    DefaultButton
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
