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
        Test
      </span>
      <span :class="classNames.caretDownWrapper">
        <Icon :class="classNames.caretDown" icon-name="ChevronDown" />
      </span>
    </div>

    <div v-if="isOpen">
      <Callout :target="$refs.dropdown"
               :is-beak-visible="false"
               :callout-width="dropdownWidth || ($refs.dropdown ? $refs.dropdown.clientWidth : 0)">
        <div :class="classNames.dropdownItemsWrapper"
             tabindex="0">
          <ActionButton v-for="(option, index) in options"
                        :key="index"
                        :class-name="
                          option.hidden
                            ? classNames.dropdownItemHidden
                            : isItemSelected && option.disabled === true
                              ? classNames.dropdownItemSelectedAndDisabled
                              : isItemSelected
                                ? classNames.dropdownItemSelected
                                : option.disabled === true
                                  ? classNames.dropdownItemDisabled
                                  : classNames.dropdownItem
                        ">
            {{ option.text }}
          </ActionButton>
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
import { getStyles } from './Dropdown.styles'
import { getClassNames } from '../../util/getClassNames'
import { RectangleEdge } from '../../utilities'

import { Icon } from '../Icon'
import { Label } from '../Label'
import { Callout } from '../Callout'
import { ActionButton } from '../Button'

@Component({
  components: { Callout, ActionButton, Icon, Label },
})
export default class Dropdown extends BaseComponent {
  @Prop() errorMessage!: string
  @Prop() label!: string
  @Prop() required!: boolean
  @Prop() disabled!: boolean
  @Prop() options!: any[]
  @Prop() selectedOptions!: any
  @Prop() panelProps!: any
  @Prop() calloutProps!: any
  @Prop() dropdownWidth!: number

  isOpen: boolean = false
  calloutRenderEdge: RectangleEdge = -1

  get classNames () {
    const { theme, className, errorMessage, label, required, disabled, panelProps, calloutProps } = this
    const { isOpen, calloutRenderEdge } = this
    const selectedOptions = []
    return getClassNames(getStyles, {
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

  get hasErrorMessage () {
    return this.errorMessage && this.errorMessage.length > 0
  }
}
</script>

<style lang="scss" scoped>
</style>
