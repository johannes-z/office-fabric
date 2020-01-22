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
      <f-checkbox>Unchecked checkbox</f-checkbox>
      <f-checkbox checked label="Checked checkbox" />
      <f-checkbox disabled>Disabled checkbox</f-checkbox>
      <f-checkbox checked disabled>Disabled checked checkbox</f-checkbox>

      <h2>Controlled</h2>
      <f-checkbox v-model="value1"
                  :label="value1 ? 'Controlled Checkbox checked' : 'Controlled Checkbox unchecked'" />
      <f-checkbox box-side="end">Checkbox rendered with boxSide "end"</f-checkbox>
      <f-checkbox @blur="onBlur" @focus="onFocus">
        Checkbox with event listeners
      </f-checkbox>
      <f-checkbox>
        Custom-rendered label with a
        <f-link href="https://www.microsoft.com" target="_blank">
          link
        </f-link>
      </f-checkbox>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
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
