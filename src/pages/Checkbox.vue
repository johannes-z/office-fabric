<template>
  <div>
    <h1>Checkbox</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Basic Checkboxes</h2>
      <FabricCheckbox>Test</FabricCheckbox>
      <FabricCheckbox disabled />
      <FabricCheckbox checked label="test" />
      <FabricCheckbox checked disabled />

      <h2>Controlled</h2>
      <FabricCheckbox v-model="value1"
                      :label="value1 ? 'checked' : 'unchecked'" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricCheckbox from '@/components/Checkbox/Checkbox.vue'

@Component({
  components: {
    FabricCheckbox,
  },
})
export default class CheckboxPage extends Vue {
  value1: boolean = true
}
</script>

<style lang="scss" module>
</style>
