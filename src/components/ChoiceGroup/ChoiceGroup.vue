<template>
  <div :class="classNames.applicationRole">
    <div :class="classNames.root">
      <Label :class="classNames.label"
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
          @click.native="selectedOption = option">
          {{ option.text }}
        </ChoiceGroupOption>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ChoiceGroupOption from './ChoiceGroupOption/ChoiceGroupOption.vue'
import BaseComponent from '../BaseComponent'
import { getStyles } from './ChoiceGroup.styles'
import { getClassNames } from '../../util/getClassNames'
import { Label } from '@/components'

@Component({
  components: { ChoiceGroupOption, Label },
})
export default class ChoiceGroup extends BaseComponent {
  @Prop({ default: null }) label!: string
  @Prop({ default: () => [] }) options!: any[]
  @Prop({ default: () => [] }) value!: any[]
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) required!: boolean

  selectedOption: any = {}

  get classNames () {
    const { theme, className } = this

    return getClassNames(getStyles, {
      theme, className, optionsContainIconOrImage: false,
    })
  }
}
</script>
