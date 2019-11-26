<template>
  <div>
    <h1>ChoiceGroup</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default ChoiceGroup</h2>
      <FabricChoiceGroup label="test" :options="options" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.vue'

@Component({
  components: {
    FabricChoiceGroup,
  },
})
export default class ChoiceGroupPage extends Vue {
  options = [
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C', disabled: true },
    { key: 'D', text: 'Option D' },
  ]
}
</script>

<style lang="scss" module>
</style>
