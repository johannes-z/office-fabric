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
      <h2>Basic Checkboxes</h2>
      <OCheckbox>Unchecked checkbox</OCheckbox>
      <OCheckbox checked label="Checked checkbox" />
      <OCheckbox disabled>Disabled checkbox</OCheckbox>
      <OCheckbox checked disabled>Disabled checked checkbox</OCheckbox>

      <OCheckbox box-side="end">Test</OCheckbox>

      <h2>Controlled</h2>
      <OCheckbox v-model="value1"
                 :label="value1 ? 'Controlled Checkbox checked' : 'Controlled Checkbox unchecked'" />
      <OCheckbox box-side="end">Checkbox rendered with boxSide "end"</OCheckbox>
      <OCheckbox @blur="onBlur" @focus="onFocus">
        Checkbox with event listeners
      </OCheckbox>
      <OCheckbox>
        Custom-rendered label with a
        <OLink href="https://www.microsoft.com" target="_blank">
          link
        </OLink>
      </OCheckbox>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { OCheckbox } from '@/components/Checkbox'
import { OLink } from '@/components/Link'

@Component({
  components: {
    OCheckbox,
    OLink,
  },
})
export default class CheckboxPage extends Vue {
  value1: boolean = true

  onFocus () {
    console.log('Checkbox is focused')
  }

  onBlur () {
    console.log('Checkbox is blurred')
  }
}
</script>

<style lang="scss" module>
</style>
