<template>
  <div :class="classNames.applicationRole">
    <div :class="classNames.root">
      <Label v-if="label"
             :class="classNames.label"
             :required="required"
             :disabled="disabled">
        {{ label }}
      </Label>

      <div :class="classNames.flexContainer">
        <ChoiceGroupOption
          v-for="option in options"
          :id="option.key"
          :key="option.key"
          v-bind="option"
          :checked="selectedOption.key === option.key"
          @click.native="onClick(option)">
          {{ option.text }}
        </ChoiceGroupOption>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ChoiceGroupOption } from './ChoiceGroupOption'
import BaseComponent from '../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'

import { Label } from '../Label'

const getClassNames = classNamesFunction()

@Component({
  components: { ChoiceGroupOption, Label },
})
export default class ChoiceGroup extends BaseComponent {
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: Array, default: () => [] }) options!: any[]
  @Prop({ type: Array, default: () => [] }) value!: any[]
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean

  selectedOption: any = {}

  get classNames () {
    const { styles, theme, className } = this

    return getClassNames(styles, {
      theme, className, optionsContainIconOrImage: false,
    })
  }

  private onClick (option: any) {
    if (option.disabled) return
    this.selectedOption = option
  }
}
</script>
