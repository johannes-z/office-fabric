<template>
  <div>
    <SpinButton />
    <SpinButton :step="0.1" />
    <SpinButton disabled />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SpinButton from '../components/SpinButton/SpinButton.vue'

@Component({
  components: {
    SpinButton,
  },
})
export default class SpinButtonPage extends Vue {
}
</script>

<style lang="scss" module>
</style>
