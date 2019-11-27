<template>
  <div>
    <OToggle label="Checked with On and Off Text"
             default-checked
             on-text="On"
             off-text="Off" />
    <OToggle label="Unchecked with On Text" on-text="On" />
    <OToggle label="Unchecked with Off Text" off-text="Off" />
    <OToggle label="Test"
             disabled
             default-checked />
    <OToggle label="Test" disabled />

    <OToggle label="With inline label"
             on-text="On"
             off-text="Off"
             inline-label
             default-checked
             :styles="toggleStyleProp" />
    <OToggle label="Disabled with inline label"
             on-text="On"
             off-text="Off"
             inline-label />
    <OToggle label="With inline label and without onText and offText"
             inline-label
             disabled
             default-checked />
    <OToggle label="Disabled with inline label and without onText and offText"
             inline-label
             disabled />

    <div>Controlled</div>
    <OToggle v-model="toggleState" label="Test" /> {{ toggleState }}
    <OToggle label="Test">
      <template #label="{ checked, disabled, label }">
        <div>label: {{ label }}, checked: {{ checked }}, disabled: {{ disabled }}</div>
      </template>
    </OToggle>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { OToggle, IToggleStyles } from '@/components/Toggle/'

@Component({
  components: {
    OToggle,
  },
})
export default class TogglePage extends Vue {
  toggleState: boolean = false

  isGlobal: boolean = false

  toggleStyleProp: IToggleStyles = {
    label: {
      fontWeight: 'bold',
    },
  }
}
</script>

<style lang="scss" module>
</style>
