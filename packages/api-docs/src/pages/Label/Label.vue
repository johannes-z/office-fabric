<template>
  <div>
    <h1>Label</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Label</h2>
      <f-label>I'm a Label</f-label>
      <f-label disabled>I'm a disabled Label</f-label>
      <f-label required>I'm a required Label</f-label>
      <f-label disabled required>I'm a disabled and required Label</f-label>

      <f-label required for="label-test-1">A Label for An Input</f-label>
      <f-text-field id="label-test-1" type="text" />
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
export default class LabelPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
