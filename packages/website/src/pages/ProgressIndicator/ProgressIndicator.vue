<template>
  <div>
    <h1>ProgressIndicator</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default ProgressIndicator</h2>
      <f-progress-indicator label="Example title"
                            description="Example description"
                            :percent-complete="5" />
      <f-progress-indicator :percent-complete="50" />
      <f-progress-indicator label="Bar Height Example"
                            :bar-height="5"
                            :percent-complete="75" />
      <f-progress-indicator :percent-complete="100" />
      <h2>Indeterminate ProgressIndicator</h2>
      <f-progress-indicator indeterminate />
      <f-progress-indicator indeterminate
                            :bar-height="5" />

      <h2>Slots</h2>
      <f-progress-indicator indeterminate :bar-height="5">
        <template #label><f-spinner :size="12" /></template>
        <template #description><f-icon icon-name="CompassNW" /></template>
      </f-progress-indicator>
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
export default class ProgressIndicatorPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
