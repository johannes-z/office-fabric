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

      <f-swatch-color-picker v-model="color"
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
}
</script>

<style lang="scss" module>
</style>
