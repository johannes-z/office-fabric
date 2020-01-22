<template>
  <div>
    <h1>Spinner</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Spinner</h2>

      <f-spinner :size="12" />
      <f-spinner :size="16" />
      <f-spinner :size="20" />
      <f-spinner :size="28" />

      <h2>Spinner label positioning</h2>
      <div>
        <f-label>Spinner with label positioned below</f-label>
        <f-spinner>I am definitely loading...</f-spinner>
      </div>

      <div>
        <f-label>Spinner with label positioned above</f-label>
        <f-spinner label="Seriously, still loading..." label-position="top" />
      </div>

      <div>
        <f-label>Spinner with label positioned to right</f-label>
        <f-spinner label="Wait, wait..." label-position="right" />
      </div>

      <div>
        <f-label>Spinner with label positioned to left</f-label>
        <f-spinner label="Nope, still loading..." label-position="left" />
      </div>
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
export default class SpinnerPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
