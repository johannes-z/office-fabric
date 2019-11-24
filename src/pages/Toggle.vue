<template>
  <div>
    <FabricToggle label="Checked with On and Off Text"
                  default-checked
                  on-text="On"
                  off-text="Off" />
    <FabricToggle label="Unchecked with On Text" on-text="On" />
    <FabricToggle label="Unchecked with Off Text" off-text="Off" />
    <FabricToggle label="Test"
                  disabled
                  default-checked />
    <FabricToggle label="Test" disabled />

    <FabricToggle label="With inline label"
                  on-text="On"
                  off-text="Off"
                  inline-label
                  default-checked />
    <FabricToggle label="Disabled with inline label"
                  on-text="On"
                  off-text="Off"
                  inline-label />
    <FabricToggle label="With inline label and without onText and offText"
                  inline-label
                  disabled
                  default-checked />
    <FabricToggle label="Disabled with inline label and without onText and offText"
                  inline-label
                  disabled />

    <div>Controlled</div>
    <FabricToggle label="Test" :checked.sync="toggleState" /> {{ toggleState }}
    <FabricToggle label="Test">
      <template #label="{ checked, disabled, label }">
        <div>label: {{ label }}, checked: {{ checked }}, disabled: {{ disabled }}</div>
      </template>
    </FabricToggle>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricToggle from '@/components/Toggle/Toggle.vue'

@Component({
  components: {
    FabricToggle,
  },
})
export default class TogglePage extends Vue {
  toggleState: boolean = false
}
</script>

<style lang="scss" module>
</style>
