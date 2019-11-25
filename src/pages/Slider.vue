<template>
  <div>
    <h1>Slider</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <FabricSlider label="Basic Example"
                    :min="0"
                    :max="10"
                    :value="3" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricSlider from '@/components/Slider/Slider.vue'

@Component({
  components: {
    FabricSlider,
  },
})
export default class SliderPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
