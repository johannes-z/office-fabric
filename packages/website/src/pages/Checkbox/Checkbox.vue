<template>
  <div>
    <h1>Checkbox</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h3>Basic Checkboxes</h3>
      <Stack :tokens="stackTokens">
        <Checkbox>Unchecked checkbox</Checkbox>
        <Checkbox checked label="Checked checkbox" />
        <Checkbox disabled>Disabled checkbox</Checkbox>
        <Checkbox checked disabled>Disabled checked checkbox</Checkbox>
      </Stack>

      <h3>Controlled</h3>
      <Stack :tokens="stackTokens">
        <Checkbox v-model="value1"
                  :label="value1 ? 'Controlled Checkbox checked' : 'Controlled Checkbox unchecked'" />
        <Checkbox box-side="end">Checkbox rendered with boxSide "end"</Checkbox>
        <Checkbox @blur="onBlur" @focus="onFocus">
          Checkbox with event listeners
        </Checkbox>
        <Checkbox>
          Custom-rendered label with a
          <f-link href="https://www.microsoft.com" target="_blank">
            link
          </f-link>
        </Checkbox>
      </Stack>

      <h3>Indeterminate Checkboxes</h3>
      <Stack :tokens="stackTokens">
        <Checkbox label="Indeterminate checkbox (uncontrolled)" default-indeterminate />

        <Checkbox
          label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
          default-indeterminate
          default-checked />

        <Checkbox label="Disabled indeterminate checkbox"
                  disabled
                  default-indeterminate />

        <Checkbox v-model="value2"
                  label="Indeterminate checkbox (controlled)"
                  indeterminate
                  checked />
      </Stack>

      <h3>Array Checkboxes</h3>
      <Stack :tokens="stackTokens">
        <Checkbox v-for="item in items"
                  :key="item.index"
                  :checked="selection.indexOf(item.index) > -1"
                  @input="onSelect(item)">
          {{ item.text }}
        </Checkbox>

        <DefaultButton @click.native="selectAll">Select All</DefaultButton>
        <DefaultButton @click.native="deselectAll">Deselect All</DefaultButton>
      </Stack>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Stack, Checkbox, IStackTokens, DefaultButton } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    Checkbox,
    Stack,
    DefaultButton,
  },
})
export default class CheckboxPage extends Vue {
  value1: boolean = true
  value2: boolean = false
  stackTokens: IStackTokens = { childrenGap: 10 }

  selection: any[] = []
  items = Array(5).fill(null).map((_, i) => ({
    index: i,
    text: `Item #${i + 1}`,
  }))

  onFocus () {
    console.log('Checkbox is focused')
  }

  onBlur () {
    console.log('Checkbox is blurred')
  }

  onSelect (item: { index: number }) {
    const index = this.selection.indexOf(item.index)
    if (index > -1) {
      this.selection.splice(index, 1)
    } else {
      this.selection.push(item.index)
    }
  }

  selectAll () {
    this.selection = this.items.map(i => i.index)
  }

  deselectAll () {
    this.selection = []
  }
}
</script>
