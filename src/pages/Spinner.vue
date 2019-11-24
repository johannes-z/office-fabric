<template>
  <div>
    <h1>Spinner</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Spinner</h2>

      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />

      <h2>Spinner label positioning</h2>
      <div>
        <Label>Spinner with label positioned below</Label>
        <Spinner label="I am definitely loading..." />
      </div>

      <div>
        <Label>Spinner with label positioned above</Label>
        <Spinner label="Seriously, still loading..." label-position="top" />
      </div>

      <div>
        <Label>Spinner with label positioned to right</Label>
        <Spinner label="Wait, wait..." label-position="right" />
      </div>

      <div>
        <Label>Spinner with label positioned to left</Label>
        <Spinner label="Nope, still loading..." label-position="left" />
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Spinner from '../components/Spinner/Spinner.vue'
import Label from '../components/Label/Label.vue'

@Component({
  components: {
    Label,
    Spinner,
  },
})
export default class SpinnerPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
