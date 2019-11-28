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

      <o-spinner :size="12" />
      <o-spinner :size="16" />
      <o-spinner :size="20" />
      <o-spinner :size="28" />

      <h2>Spinner label positioning</h2>
      <div>
        <o-label>Spinner with label positioned below</o-label>
        <o-spinner>I am definitely loading...</o-spinner>
      </div>

      <div>
        <o-label>Spinner with label positioned above</o-label>
        <o-spinner label="Seriously, still loading..." label-position="top" />
      </div>

      <div>
        <o-label>Spinner with label positioned to right</o-label>
        <o-spinner label="Wait, wait..." label-position="right" />
      </div>

      <div>
        <o-label>Spinner with label positioned to left</o-label>
        <o-spinner label="Nope, still loading..." label-position="left" />
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
