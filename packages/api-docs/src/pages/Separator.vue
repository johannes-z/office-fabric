<template>
  <div>
    <h1>Separator</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Horizontal Separator</h2>
      <f-stack :tokens="{ childrenGap: 12 }">
        <f-text>Horizontal center aligned</f-text>
        <f-separator>Separator</f-separator>

        <f-text>Horizontal start aligned</f-text>
        <f-separator align-content="start">Start</f-separator>

        <f-text>Horizontal end aligned</f-text>
        <f-separator align-content="end">End</f-separator>

        <f-text>Empty horizontal</f-text>
        <f-separator />
      </f-stack>

      <h2>Vertical Separator</h2>
      <div style="height: 200px;">
        <f-separator vertical>Separator</f-separator>
        <f-separator vertical align-content="start">Start</f-separator>
        <f-separator vertical align-content="end">End</f-separator>
        <f-separator vertical />
      </div>

      <h2>Basic Themed Separator with Text</h2>
      <f-separator :theme="theme">Today</f-separator>

      <h2>Separator Slot</h2>
      <f-separator><f-icon icon-name="Attach" /></f-separator>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ITheme, createTheme } from '@uifabric/styling'

@Component({
  components: {
  },
})
export default class SeparatorPage extends Vue {
  theme: ITheme = createTheme({
    fonts: {
      medium: {
        fontFamily: 'Monaco, Menlo, Consolas',
        fontSize: '30px',
      },
    },
  });
}
</script>

<style lang="scss" module>
</style>
