<script setup lang="ts">
import DocSection from './components/DocSection.vue'
import { Label, SwatchColorPicker } from '@/components/'

const colorCellsExample1 = [
  { id: 'a', label: 'orange', color: '#ca5010' },
  { id: 'b', label: 'cyan', color: '#038387' },
  { id: 'c', label: 'blueMagenta', color: '#8764b8' },
  { id: 'd', label: 'magenta', color: '#881798' },
  { id: 'e', label: 'white', color: '#ffffff' },
]
const baseId = 'colorpicker'
</script>

<template>
  <h1>SwatchColorPicker</h1>

  <DocSection>
    <h2>Usage</h2>

    <h3>Simple SwatchColorPicker</h3>
    <SwatchColorPicker :column-count="5" cell-shape="circle" :color-cells="colorCellsExample1" />
    <SwatchColorPicker :column-count="5" cell-shape="square" :color-cells="colorCellsExample1" />
    <SwatchColorPicker :column-count="5" cell-shape="square" :color-cells="colorCellsExample1" :cell-height="35" :cell-width="35" />

    <Label>Simple disabled circle swatch color picker: </Label>
    <SwatchColorPicker
      disabled
      :column-count="5"
      cell-shape="circle"
      :color-cells="colorCellsExample1"
      :aria-labelledby="`${baseId}-disabled`"
    />
  </DocSection>
</template>
