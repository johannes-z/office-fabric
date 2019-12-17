<template>
  <input ref="inputElement"
         autocomplete="off"
         autocapitalize="off"
         :value="displayValue">
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { isIE11 } from '@fabric-vue/utilities'

const SELECTION_FORWARD = 'forward'
const SELECTION_BACKWARD = 'backward'

@Component({
  components: {},
})
export default class Autofill extends Vue {
  $refs!: {
    inputElement: HTMLInputElement
  }

  @Prop({ default: '' }) defaultVisibleValue!: string
  @Prop({ default: '' }) suggestedDisplayValue!: string
  @Prop({ default: null }) onInputChange!: (value: string, composing: boolean) => any

  _autoFillEnabled: boolean = false
  _isComposing: boolean = false
  _value: string = this.defaultVisibleValue || ''
  displayValue: string = this.defaultVisibleValue || ''

  public get cursorLocation (): number | null {
    if (this.$refs.inputElement) {
      const inputElement = this.$refs.inputElement
      if (inputElement.selectionDirection !== SELECTION_FORWARD) {
        return inputElement.selectionEnd
      } else {
        return inputElement.selectionStart
      }
    } else {
      return -1
    }
  }

  private _onInputChanged = (ev: Event) => {
    const value: string = this._getCurrentInputValue(ev)

    if (!this._isComposing) {
      this._tryEnableAutofill(value, this._value, ev.composed)
    }

    // If it is not IE11 and currently composing, update the value
    if (!(isIE11() && this._isComposing)) {
      const nativeEventComposing = ev.composed
      const isComposing = nativeEventComposing === undefined ? this._isComposing : nativeEventComposing
      this._updateValue(value, isComposing)
    }
  };

  private _getCurrentInputValue (ev?: Event): string {
    if (ev && ev.target && (ev.target as any).value) {
      return (ev.target as any).value
    } else if (this.$refs.inputElement && this.$refs.inputElement.value) {
      return this.$refs.inputElement.value
    } else {
      return ''
    }
  }

  /**
   * Updates the current input value as well as getting a new display value.
   * @param newValue - The new value from the input
   */
  private _updateValue (newValue: string, composing: boolean) {
    // Only proceed if the value is nonempty and is different from the old value
    // This is to work around the fact that, in IE 11, inputs with a placeholder fire an onInput event on focus
    if (!newValue && newValue === this._value) {
      return
    }
    this._value = this.onInputChange ? this.onInputChange(newValue, composing) : newValue
    this.displayValue = this._getDisplayValue(this._value, this.suggestedDisplayValue)
  }

  private _getDisplayValue (inputValue: string, suggestedDisplayValue?: string): string {
    let displayValue = inputValue
    if (suggestedDisplayValue && inputValue && this._doesTextStartWith(suggestedDisplayValue, displayValue) && this._autoFillEnabled) {
      displayValue = suggestedDisplayValue
    }
    return displayValue
  }

  private _doesTextStartWith (text: string, startWith: string): boolean {
    if (!text || !startWith) {
      return false
    }
    return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0
  }

  /**
   * Attempts to enable autofill. Whether or not autofill is enabled depends on the input value,
   * whether or not any text is selected, and only if the new input value is longer than the old input value.
   * Autofill should never be set to true if the value is composing. Once compositionEnd is called, then
   * it should be completed.
   * See https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent for more information on composition.
   * @param newValue - new input value
   * @param oldValue - old input value
   * @param isComposing - if true then the text is actively being composed and it has not completed.
   * @param isComposed - if the text is a composed text value.
   */
  private _tryEnableAutofill (newValue: string, oldValue: string, isComposing?: boolean, isComposed?: boolean): void {
    if (
      !isComposing &&
      newValue &&
      this.$refs.inputElement &&
      this.$refs.inputElement.selectionStart === newValue.length &&
      !this._autoFillEnabled &&
      (newValue.length > oldValue.length || isComposed)
    ) {
      this._autoFillEnabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
