<template>
  <div>
    <h1>OModal</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default OModal</h2>
      <DefaultButton @click.native="isOpen = true">Show Modal</DefaultButton>
      <OModal :is-open="isOpen">
        Test
      </OModal>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { OModal } from '../components/'
import DefaultButton from '@/components/Button/DefaultButton.vue'

@Component({
  components: {
    DefaultButton,
    OModal,
  },
})
export default class ModalPage extends Vue {
  isOpen: boolean = false
}
</script>

<style lang="scss" module>
</style>
