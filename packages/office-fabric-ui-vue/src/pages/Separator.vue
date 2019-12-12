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
      <o-separator>Separator</o-separator>
      <o-separator align-content="start">Start</o-separator>
      <o-separator align-content="end">End</o-separator>
      <o-separator />

      <h2>Vertical Separator</h2>
      <div style="height: 200px;">
        <o-separator vertical>Separator</o-separator>
        <o-separator vertical align-content="start">Start</o-separator>
        <o-separator vertical align-content="end">End</o-separator>
        <o-separator vertical />
      </div>

      <h2>Separator Slot</h2>
      <o-separator><o-icon icon-name="Attach" /></o-separator>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class SeparatorPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
