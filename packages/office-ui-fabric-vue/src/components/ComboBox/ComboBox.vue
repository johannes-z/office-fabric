<template>
  <div :class="classNames.container">
    <Label :for="`ComboBox${_uid}`" :class="classNames.label">Label</Label>
    <div ref="comboBoxWrapper" :class="classNames.root">
      <Autofill :id="`ComboBox${_uid}`"
                ref="autofill"
                type="text"
                role="combobox"
                :class="classNames.input" />
      <IconButton class="ms-ComboBox-CaretDown-button"
                  :icon-props="{ iconName: 'ChevronDown' }"
                  @focus.native="onFocus"
                  @blur.native="onBlur" />
    </div>

    <VNodes :vnodes="test()" />

    <div v-if="persistMenu || state.isOpen">
      <Callout :class="css(classNames.callout, calloutProps ? calloutProps.className : undefined)"
               :target="$refs.comboBoxWrapper"
               :is-beak-visible="false"
               :gap-space="0"
               :do-not-layer="false"
               :callout-width="getComboBoxMenuWidth()"
               :callout-max-width="getComboBoxMenuWidth()"
               :hidden="persistMenu ? !state.isOpen : undefined">
        <div ref="comboBoxMenu" :class="classNames.optionsContainerWrapper">
          <div :class="classNames.optionsContainer" role="listbox">
            <Checkbox v-if="multiSelect" class="ms-ComboBox-option">
              Test
            </Checkbox>
            <ActionButton class="ms-ComboBox-option">
              Test
            </ActionButton>
          </div>
        </div>
      </Callout>
    </div>
  </div>
</template>

<script lang="tsx">
import { ResizeObserver } from 'resize-observer'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction, KeyCodes, Async } from '@uifabric-vue/utilities'
import { getStyles, getOptionStyles } from './ComboBox.styles'
import BaseComponent from '../BaseComponent'
import { Label } from '../Label/'
import { IconButton, ActionButton } from '../Button'
import Autofill from '../Autofill/Autofill.vue'
import VNodes from '../VNodes'

import { getClassNames } from './ComboBox.classNames'
import { IComboBoxOption, IComboBoxOptionStyles, IComboBoxProps } from './ComboBox.types'
import { Callout } from '../Callout'
import { Checkbox } from '../Checkbox'

export interface IComboBoxState {
  /** The open state */
  isOpen?: boolean;

  /** The currently selected indices */
  selectedIndices?: number[];

  /** The focused state of the comboBox */
  focused?: boolean;

  /** This value is used for the autocomplete hint value */
  suggestedDisplayValue?: string;

  /** The options currently available for the callout */
  currentOptions: IComboBoxOption[];

  /**
   * When taking input, this will store the index that the options input matches
   * (-1 if no input or match)
   */
  currentPendingValueValidIndex: number;

  /**
   * Stores the hovered over value in the dropdown
   * (used for styling the options without updating the input)
   */
  currentPendingValueValidIndexOnHover: number;

  /** When taking input, this will store the actual text that is being entered */
  currentPendingValue?: string;
}

enum SearchDirection {
  backward = -1,
  none = 0,
  forward = 1
}

enum HoverStatus {
  /** Used when the user was hovering and has since moused out of the menu items */
  clearAll = -2,
  /** Default "normal" state, when no hover has happened or a hover is in progress */
  default = -1
}

const ScrollIdleDelay = 250 /* ms */
const TouchIdleDelay = 500 /* ms */

/**
 * This is used to clear any pending autocomplete text (used when autocomplete is true and
 * allowFreeform is false)
 */
const ReadOnlyPendingAutoCompleteTimeout = 1000 /* ms */

interface IComboBoxOptionWrapperProps extends IComboBoxOption {
  /** True if the option is currently selected */
  isSelected: boolean;

  /** True if the option is currently checked (multi-select) */
  isChecked: boolean;

  /**
   * A function that returns the children of the OptionWrapper. We pass this in as a function to ensure that
   * children methods don't get called unnecessarily if the component doesn't need to be updated. This leads
   * to a significant performance increase in ComboBoxes with many options and/or complex onRenderOption functions
   */
  render: () => JSX.Element;
}
@Component({
  components: { Autofill, Label, IconButton, Callout, ActionButton, Checkbox, VNodes },
})
export default class ComboBox extends BaseComponent<IComboBoxProps, IComboBoxState> {
  $refs!: {
    comboBoxWrapper: HTMLDivElement
    comboBoxMenu: HTMLDivElement
    autofill: any
  }

  @Prop() allowFreeform!: boolean
  @Prop() autoComplete!: string
  @Prop() errorMessage!: string
  @Prop() text!: any
  @Prop() calloutProps!: any
  @Prop() buttonIconProps!: any
  @Prop() comboBoxOptionStyles!: any
  @Prop() autofill!: boolean
  @Prop() disabled!: boolean
  @Prop() required!: boolean
  @Prop() persistMenu!: boolean
  @Prop({ type: Boolean, default: false }) multiSelect!: boolean

  state: IComboBoxState = {
    isOpen: false,
    selectedIndices: [],
    focused: false,
    suggestedDisplayValue: '',
    currentOptions: [],
    currentPendingValueValidIndex: 0,
    currentPendingValueValidIndexOnHover: 0,
    currentPendingValue: '',
  }

  comboBoxMenuWidth: number = 0

  mounted () {
    const cb = this._async.throttle(() => {
      if (!this.$refs.comboBoxWrapper) return
      /** Update `comboBoxMenuWidth` with 60 fps. */
      this.comboBoxMenuWidth = this.$refs.comboBoxWrapper.clientWidth + 2
    }, 1 / 60)
    const observer = new ResizeObserver(cb)
    observer.observe(this.$refs.comboBoxWrapper)
  }

  test () {
    return (
      <div>Test {this.comboBoxMenuWidth}</div>
    )
  }

  get hasErrorMessage () {
    const errorMessage = this.errorMessage
    return !!(errorMessage && errorMessage.length > 0)
  }

  get classNames (): any {
    const { theme, className, styles: customStyles, disabled, required, allowFreeform, hasErrorMessage } = this
    const { isOpen, focused, suggestedDisplayValue } = this.state
    return getClassNames(
      getStyles(theme!, customStyles),
      className!,
      !!isOpen,
      !!disabled,
      !!required,
      !!focused,
      !!allowFreeform,
      !!hasErrorMessage,
    )
  }

  /**
   * Gets the current comboBoxWrapper width, including its border offset. Has to be recalculated on each render cycle of
   * the Callout, in case the window size changed.
   */
  private getComboBoxMenuWidth (): number {
    if (!this.$refs.comboBoxWrapper) return 0
    return this.$refs.comboBoxWrapper.clientWidth + 2
  }

  private onFocus (e: FocusEvent) {
  }

  private onBlur (e: FocusEvent) {
    console.log(e)
  }
}
</script>
