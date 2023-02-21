<template>
  <div>
    <h1>Label</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Label</h2>
      <Label :class="$style.test" v-text="`I'm a Label`" />
      <Label disabled>I'm a disabled Label</Label>
      <Label required>I'm a required Label</Label>
      <Label disabled required>I'm a disabled and required Label</Label>

      <Label required for="label-test-1">A Label for An Input</Label>
      <TextField id="label-test-1" type="text" />
    </div>

    <div class="content--inner ms-depth-8" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Label, TextField } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    Label,
    TextField,
  },
})
export default class LabelPage extends Vue {
}
</script>

<style lang="scss" module>
.test {
  color: red;
}
</style>
