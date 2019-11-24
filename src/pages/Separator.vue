<template>
  <div>
    <h1>Separator</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Horizontal Separator</h2>
      <FabricSeparator>Separator</FabricSeparator>
      <FabricSeparator align-content="start">Start</FabricSeparator>
      <FabricSeparator align-content="end">End</FabricSeparator>
      <FabricSeparator />

      <h2>Vertical Separator</h2>
      <div style="height: 200px;">
        <FabricSeparator vertical>Separator</FabricSeparator>
        <FabricSeparator vertical align-content="start">Start</FabricSeparator>
        <FabricSeparator vertical align-content="end">End</FabricSeparator>
        <FabricSeparator vertical />
      </div>

      <h2>Separator Slot</h2>
      <FabricSeparator><FabricIcon icon-name="Attach" /></FabricSeparator>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricIcon from '@/components/Icon/Icon.vue'
import FabricSeparator from '@/components/Separator/Separator.vue'

@Component({
  components: {
    FabricIcon,
    FabricSeparator,
  },
})
export default class SeparatorPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
