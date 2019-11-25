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
      <ProgressIndicator label="Example title"
                         description="Example description"
                         :percent-complete="0" />
      <ProgressIndicator :percent-complete="50" />
      <ProgressIndicator label="Bar Height Example"
                         :bar-height="5"
                         :percent-complete="75" />
      <ProgressIndicator :percent-complete="100" />
      <h2>Indeterminate ProgressIndicator</h2>
      <ProgressIndicator indeterminate />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProgressIndicator from '../components/ProgressIndicator/ProgressIndicator.vue'

@Component({
  components: {
    ProgressIndicator,
  },
})
export default class ProgressIndicatorPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
