<template>
  <div>
    <h1>SwatchColorPicker</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>

      <div>Simple circle swatch color picker:</div>
      <f-swatch-color-picker v-model="color"
                             :column-count="5"
                             cell-shape="circle"
                             :color-cells="colorCellsExample1" />

      <div>Simple square swatch color picker with default size of 20px:</div>
      <f-swatch-color-picker v-model="color"
                             :column-count="5"
                             cell-shape="square"
                             :color-cells="colorCellsExample1" />

      <div>Simple square swatch color picker with custom size of 35px:</div>
      <f-swatch-color-picker v-model="color"
                             :column-count="5"
                             cell-shape="square"
                             :cell-height="35"
                             :cell-width="35"
                             :color-cells="colorCellsExample1" />

      <div>Simple square swatch color picker with custom size of 35px:</div>
      <f-swatch-color-picker v-model="color"
                             :column-count="4"
                             cell-shape="circle"
                             :cell-height="35"
                             :cell-width="35"
                             :cell-border-width="3"
                             :color-cells="colorCellsExample2" />

      <div>Simple disabled circle swatch color picker:</div>
      <f-swatch-color-picker v-model="color"
                             disabled
                             :column-count="5"
                             cell-shape="circle"
                             :color-cells="colorCellsExample1" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class SwatchColorPickerPage extends Vue {
  color: string = ''

  colorCellsExample1 = [
    { id: 'a', label: 'orange', color: '#ca5010' },
    { id: 'b', label: 'cyan', color: '#038387' },
    { id: 'c', label: 'blueMagenta', color: '#8764b8' },
    { id: 'd', label: 'magenta', color: '#881798' },
    { id: 'e', label: 'white', color: '#ffffff' },
  ]

  colorCellsExample2 = [
    { id: 'a', label: 'red', color: '#a4262c' },
    { id: 'b', label: 'orange', color: '#ca5010' },
    { id: 'c', label: 'orangeYellow', color: '#986f0b' },
    { id: 'd', label: 'yellowGreen', color: '#8cbd18' },
    { id: 'e', label: 'green', color: '#0b6a0b' },
    { id: 'f', label: 'cyan', color: '#038387' },
    { id: 'g', label: 'cyanBlue', color: '#004e8c' },
    { id: 'h', label: 'magenta', color: '#881798' },
    { id: 'i', label: 'magentaPink', color: '#9b0062' },
    { id: 'j', label: 'black', color: '#000000' },
    { id: 'k', label: 'gray', color: '#7a7574' },
    { id: 'l', label: 'gray20', color: '#69797e' },
  ]
}
</script>

<style lang="scss" module>
</style>
