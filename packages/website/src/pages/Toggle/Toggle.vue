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
      <f-toggle label="Checked with On and Off Text"
                default-checked
                on-text="On"
                off-text="Off" />
      <f-toggle label="Unchecked with On Text" on-text="On" />
      <f-toggle label="Unchecked with Off Text" off-text="Off" />
      <f-toggle label="Disabled and checked"
                disabled
                default-checked />
      <f-toggle label="Disabled" disabled />

      <f-toggle label="With inline label"
                on-text="On"
                off-text="Off"
                inline-label
                default-checked
                :styles="toggleStyleProp" />
      <f-toggle label="Disabled with inline label"
                on-text="On"
                off-text="Off"
                inline-label />
      <f-toggle label="With inline label and without onText and offText"
                inline-label
                disabled
                default-checked />
      <f-toggle label="Disabled with inline label and without onText and offText"
                inline-label
                disabled />

      <div>Controlled</div>
      <f-toggle v-model="toggleState" label="Test" /> {{ toggleState }}
      <f-toggle v-model="toggleState" label="Test">
        <template #label="{ checked, disabled, label }">
          <div>label: {{ label }}, checked: {{ checked }}, disabled: {{ disabled }}</div>
        </template>
      </f-toggle>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
