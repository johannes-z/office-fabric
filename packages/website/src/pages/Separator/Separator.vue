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
        <Separator>Separator</Separator>

        <f-text>Horizontal start aligned</f-text>
        <Separator align-content="start">Start</Separator>

        <f-text>Horizontal end aligned</f-text>
        <Separator align-content="end">End</Separator>

        <f-text>Empty horizontal</f-text>
        <Separator />
      </f-stack>

      <h2>Vertical Separator</h2>
      <div style="height: 200px;">
        <Separator vertical>Separator</Separator>
        <Separator vertical align-content="start">Start</Separator>
        <Separator vertical align-content="end">End</Separator>
        <Separator vertical />
      </div>

      <h2>Basic Themed Separator with Text</h2>
      <Separator :theme="theme">Today</Separator>

      <h2>Separator Slot</h2>
      <Separator><f-icon icon-name="Attach" /></Separator>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ITheme, createTheme, getTheme } from '@uifabric/styling'
import { Separator } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    Separator,
  },
})
export default class SeparatorPage extends Vue {
  theme: ITheme = createTheme(Object.assign({}, getTheme(), {
    fonts: {
      medium: {
        fontFamily: 'Monaco, Menlo, Consolas',
        fontSize: '30px',
      },
    },
  }))
}
</script>

<style lang="scss" module>
</style>
