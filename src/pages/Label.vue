<template>
  <div>
    <h1>Label</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Label</h2>
      <FabricLabel>I'm a Label</FabricLabel>
      <FabricLabel disabled>I'm a disabled Label</FabricLabel>
      <FabricLabel required>I'm a required Label</FabricLabel>
      <FabricLabel disabled required>I'm a disabled and required Label</FabricLabel>

      <FabricLabel required for="label-test-1">A Label for An Input</FabricLabel>
      <input id="label-test-1" type="text">
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricLabel from '@/components/Label/Label.vue'

@Component({
  components: {
    FabricLabel,
  },
})
export default class LabelPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
