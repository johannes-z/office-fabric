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
      <DefaultButton @click.native="isOpen = !isOpen">{{ isOpen ? 'Hide' : 'Show' }} Panel</DefaultButton>
      <f-panel :is-open="isOpen"
               :on-dismiss="() => isOpen = false"
               @close="isOpen = false">
        <template #header>Sample panel</template>

        <span>Content goes here.</span>
      </f-panel>
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
export default class PanelPage extends Vue {
  isOpen: boolean = false
}
</script>

<style lang="scss" module>
</style>
