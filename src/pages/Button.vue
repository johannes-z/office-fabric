<template>
  <div>
    <h1>Button</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Button</h2>
      <FabricDefaultButton>Test</FabricDefaultButton>
      <FabricDefaultButton primary>Test</FabricDefaultButton>
      <FabricDefaultButton disabled>Test</FabricDefaultButton>
      <FabricDefaultButton disabled primary>Test</FabricDefaultButton>

      <PrimaryButton text="abc" />

      <h2>Icon Button</h2>
      <IconButton icon-name="Upload" />
      <IconButton icon-name="Upload" disabled />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricDefaultButton from '@/components/Button/DefaultButton.vue'
import PrimaryButton from '../components/Button/PrimaryButton.vue'
import IconButton from '../components/Button/IconButton.vue'

@Component({
  components: {
    FabricDefaultButton,
    PrimaryButton,
    IconButton,
  },
})
export default class ButtonPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
