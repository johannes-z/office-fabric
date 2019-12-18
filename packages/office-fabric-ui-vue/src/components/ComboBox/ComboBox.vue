<template>
  <div :class="classNames.container">
    <Label :for="`ComboBox${_uid}`" :class-name="classNames.label">Label</Label>
    <div :class="classNames.root">
      <Autofill :id="`ComboBox${_uid}`"
                type="text"
                role="combobox"
                :class="classNames.input" />
      <IconButton class="ms-ComboBox-CaretDown-button"
                  :icon-props="{ iconName: 'ChevronDown' }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '@fabric-vue/utilities'
import { getStyles } from './ComboBox.styles'
import BaseComponent from '../BaseComponent'
import { Label } from '../Label/'
import { IconButton } from '../Button'
import Autofill from '../Autofill/Autofill.vue'

const getClassNames = classNamesFunction()

@Component({
  components: { Autofill, Label, IconButton },
})
export default class ComboBox extends BaseComponent {
  get classNames () {
    const { theme, className } = this
    return getClassNames(getStyles(theme, {}) as any, {
      theme,
      className,
    })
  }
}
</script>
