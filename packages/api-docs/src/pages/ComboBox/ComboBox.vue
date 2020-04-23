<template>
  <div>
    <h1>ComboBox</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>ComboBox</h2>
      <f-combo-box :options="comboBoxBasicOptions"
                   auto-complete="on" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComboBoxOption, Autofill } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    Autofill,
  },
})
export default class ComboBoxPage extends Vue {
  comboBoxBasicOptions: IComboBoxOption[] = [
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C' },
    { key: 'D', text: 'Option D' },
    { key: 'E', text: 'Option E' },
    { key: 'F', text: 'Option F', disabled: true },
    { key: 'G', text: 'Option G' },
    { key: 'H', text: 'Option H' },
    { key: 'I', text: 'Option I' },
    { key: 'J', text: 'Option J' },
  ];
}
</script>
