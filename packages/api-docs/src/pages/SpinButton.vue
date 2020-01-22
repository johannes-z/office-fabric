<template>
  <div>
    <h1>SpinButton</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Basic SpinButton</h2>
      <SpinButton label="Basic SpinButton:" :icon-props="{ iconName: 'IncreaseIndentLegacy' }" />
      <SpinButton label="Decimal SpinButton:" :step="0.1" />

      <h2>Basic Disabled SpinButton</h2>
      <SpinButton label="Basic SpinButton:" disabled />

      <h2>Stateful SpinButton</h2>

      <h2>Basic SpinButton With Icon</h2>
      <SpinButton :default-value="0"
                  :icon-props="{ iconName: 'IncreaseIndentLegacy' }"
                  label="Basic SpinButton:"
                  :min="0"
                  :max="100"
                  :step="1" />

      <h2>Basic SpinButton With Icon and Positioned at the End</h2>
      <SpinButton :default-value="0"
                  :icon-props="{ iconName: 'Light' }"
                  label="Basic SpinButton"
                  :label-position="Position.end"
                  :min="0"
                  :max="100"
                  :step="1" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Position, SpinButton } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    SpinButton,
  },
})
export default class SpinButtonPage extends Vue {
  Position = Position
}
</script>

<style lang="scss" module>
</style>
