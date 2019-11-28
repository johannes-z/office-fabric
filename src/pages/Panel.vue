<template>
  <div>
    <h1>Panel</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Basic</h2>
      <DefaultButton @click.native="isOpen = true">Show Panel</DefaultButton>
      <o-panel v-if="isOpen"
               header-text="Sample panel"
               @close="isOpen = false">
        <span>Content goes here.</span>
      </o-panel>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import DefaultButton from '@/components/Button/DefaultButton.vue'

@Component({
  components: {
    DefaultButton,
  },
})
export default class PanelPage extends Vue {
  isOpen: boolean = false
}
</script>

<style lang="scss" module>
</style>
