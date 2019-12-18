<template>
  <div>
    <h1>Toggle</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <o-toggle label="Checked with On and Off Text"
                default-checked
                on-text="On"
                off-text="Off" />
      <o-toggle label="Unchecked with On Text" on-text="On" />
      <o-toggle label="Unchecked with Off Text" off-text="Off" />
      <o-toggle label="Test"
                disabled
                default-checked />
      <o-toggle label="Test" disabled />

      <o-toggle label="With inline label"
                on-text="On"
                off-text="Off"
                inline-label
                default-checked
                :styles="toggleStyleProp" />
      <o-toggle label="Disabled with inline label"
                on-text="On"
                off-text="Off"
                inline-label />
      <o-toggle label="With inline label and without onText and offText"
                inline-label
                disabled
                default-checked />
      <o-toggle label="Disabled with inline label and without onText and offText"
                inline-label
                disabled />

      <div>Controlled</div>
      <o-toggle v-model="toggleState" label="Test" /> {{ toggleState }}
      <o-toggle label="Test">
        <template #label="{ checked, disabled, label }">
          <div>label: {{ label }}, checked: {{ checked }}, disabled: {{ disabled }}</div>
        </template>
      </o-toggle>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { IToggleStyles } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
  },
})
export default class TogglePage extends Vue {
  toggleState: boolean = false

  isGlobal: boolean = false

  toggleStyleProp: IToggleStyles = {
    label: {
      fontWeight: 'bold',
      color: 'red',
    },
  }
}
</script>

<style lang="scss" module>
</style>
