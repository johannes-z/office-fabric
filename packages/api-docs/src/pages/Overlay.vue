<template>
  <div>
    <h1>Overlay</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Light</h2>
      <DefaultButton @click.native="isLightOpen = true">Show Overlay</DefaultButton>
      <o-overlay v-if="isLightOpen"
                 @click.native="isLightOpen = false">
        <div :class="$style.root">
          <p>I am content within the overlay.</p>
        </div>
      </o-overlay>

      <h2>Dark</h2>
      <DefaultButton @click.native="isDarkOpen = true">Show Overlay</DefaultButton>
      <o-overlay v-if="isDarkOpen"
                 dark
                 @click.native="isDarkOpen = false">
        <div :class="$style.root">
          <p>I am content within the overlay.</p>
        </div>
      </o-overlay>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultButton } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    DefaultButton,
  },
})
export default class OverlayPage extends Vue {
  isLightOpen: boolean = false
  isDarkOpen: boolean = false
}
</script>

<style lang="scss" module>
.root {
  background: blue;
  bottom: 50%;
  color: white;
  left: 0;
  padding: 1px;
  position: absolute;
  right: 0;
}
</style>
