<template>
  <div :class="classNames.root">
    <Label :class="classNames.label"
           :required="required"
           :disabled="disabled">
      {{ label }}
    </Label>
    <div ref="dropdown"
         :class="classNames.dropdown"
         @click="isOpen = true">
      <span :class="classNames.title">
        <template v-if="selectedOptions.length">
          {{ selectedOptions.map(i => i.text).join(multiSelectDelimiter) }}
        </template>
        <template v-else>
          {{ placeholder }}
        </template>
      </span>
      <span :class="classNames.caretDownWrapper">
        <Icon :class="classNames.caretDown" icon-name="ChevronDown" />
      </span>
    </div>

    <div v-if="isOpen">
      <Callout :target="$refs.dropdown"
               :is-beak-visible="false"
               :callout-width="dropdownWidth || ($refs.dropdown ? $refs.dropdown.clientWidth : 0)"
               @dismiss="isOpen = false"
               @positioned="onPositioned">
        <div :class="classNames.dropdownItemsWrapper"
             tabindex="0">
          <components :is="multiSelect ? 'Checkbox' : 'ActionButton'"
                      v-for="(option, index) in options"
                      :key="index"
                      :class="
                        option.hidden
                          ? classNames.dropdownItemHidden
                          : option.isItemSelected && option.disabled === true
                            ? classNames.dropdownItemSelectedAndDisabled
                            : option.isItemSelected
                              ? classNames.dropdownItemSelected
                              : option.disabled === true
                                ? classNames.dropdownItemDisabled
                                : classNames.dropdownItem"
                      :disabled="option.disabled"
                      :title="option.text"
                      :checked="option.isItemSelected"
                      :styles="multiSelect ? multiSelectItemStyles : null"
                      role="option"
                      @click.native="!multiSelect && select(option)"
                      @input="multiSelect && select(option)">
            {{ option.text }}
          </components>
        </div>
      </Callout>
    </div>

    <div v-if="hasErrorMessage"
         role="alert"
         :class="classNames.errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'
import { RectangleEdge, ICalloutPositionedInfo } from '@uifabric-vue/utilities'

import { Icon } from '../Icon'
import { Label } from '../Label'
import { Callout } from '../Callout'
import { ActionButton } from '../Button'
import { Checkbox } from '../Checkbox'

@Component({
  components: { Callout, ActionButton, Checkbox, Icon, Label },
})
export default class Dropdown extends BaseComponent {
  $refs!: {
    dropdown: HTMLDivElement
  }

  @Prop({ type: Array, required: true }) options!: any[]
  @Prop({ type: Array, default: () => [] }) selectedOptions!: any[]

  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: '' }) errorMessage!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  @Prop({ type: Boolean, default: false }) multiSelect!: boolean
  @Prop({ type: String, default: ', ' }) multiSelectDelimiter !: string

  @Prop({ type: Number, default: 0 }) dropdownWidth!: number
  @Prop({ type: Object, default: () => {} }) panelProps!: any
  @Prop({ type: Object, default: () => {} }) calloutProps!: any

  isOpen: boolean = false
  calloutRenderEdge: RectangleEdge | null = null

  created () {
    this.options.forEach(option => {
      this.$set(option, 'isItemSelected', false)
    })
  }

  get classNames () {
    const { theme, className, errorMessage, label, required, disabled, panelProps, calloutProps } = this
    const { isOpen, calloutRenderEdge } = this
    const selectedOptions = this.selectedOptions
    return getClassNames(this.styles, {
      theme,
      className,
      hasError: !!(errorMessage && errorMessage.length > 0),
      hasLabel: !!label,
      isOpen,
      required,
      disabled,
      isRenderingPlaceholder: !selectedOptions.length,
      panelClassName: panelProps ? panelProps.className : undefined,
      calloutClassName: calloutProps ? calloutProps.className : undefined,
      calloutRenderEdge: calloutRenderEdge,
    })
  }

  get multiSelectItemStyles () {
    return this.classNames.subComponentStyles
      ? this.classNames.subComponentStyles.multiSelectItem
      : undefined
  }

  get hasErrorMessage () {
    return this.errorMessage && this.errorMessage.length > 0
  }

  private select (option: any) {
    if (option.disabled) return

    const index = this.selectedOptions.findIndex(o => o.key === option.key)

    if (index > -1) {
      this.selectedOptions[index].isItemSelected = false
      this.selectedOptions.splice(index, 1)
    } else {
      if (!this.multiSelect) {
        this.selectedOptions.splice(0, this.selectedOptions.length)
        this.isOpen = false
      }
      option.isItemSelected = true
      this.selectedOptions.push(option)
    }
  }

  private onPositioned (positions: ICalloutPositionedInfo) {
    if (!this.calloutRenderEdge || this.calloutRenderEdge !== positions.targetEdge) {
      this.calloutRenderEdge = positions.targetEdge
    }
  }
}
</script>
