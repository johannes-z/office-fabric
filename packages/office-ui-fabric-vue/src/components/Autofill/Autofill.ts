import { Vue, Component, Prop } from 'vue-property-decorator'
import { isIE11, KeyCodes } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'
import { IAutofillProps } from './Autofill.types'
import { CreateElement } from 'vue'

const SELECTION_FORWARD = 'forward'
const SELECTION_BACKWARD = 'backward'

@Component
export class Autofill extends BaseComponent<IAutofillProps> {
  $refs!: {
    inputElement: HTMLInputElement
  }

  @Prop({ type: String, default: '' }) defaultVisibleValue!: string
  @Prop({ type: String, default: '' }) suggestedDisplayValue!: string
  @Prop({ type: Boolean, default: false }) preventValueSelection!: boolean

  @Prop({ type: Array, default: () => [KeyCodes.down, KeyCodes.up] as KeyCodes[] }) enableAutofillOnKeyPress!: KeyCodes[]
  @Prop({ type: Function, default: null }) onInputChange!: (value: string, composing: boolean) => string
  @Prop({ type: Function, default: null }) onInputValueChange!: (newValue?: string, composing?: boolean) => void

  private autoFillEnabled: boolean = false
  private isComposing: boolean = false
  private internalValue: string = this.defaultVisibleValue || ''
  private displayValue: string = this.defaultVisibleValue || ''

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

  public get value (): string {
    return this.internalValue
  }

  public get isValueSelected (): boolean {
    return Boolean(this.$refs.inputElement && this.$refs.inputElement.selectionStart !== this.$refs.inputElement.selectionEnd)
  }

  public get selectionStart (): number | null {
    return this.$refs.inputElement ? this.$refs.inputElement.selectionStart : -1
  }

  public get selectionEnd (): number | null {
    return this.$refs.inputElement ? this.$refs.inputElement.selectionEnd : -1
  }

  public focus () {
    this.$refs.inputElement && this.$refs.inputElement.focus()
  }

  public clear () {
    this.autoFillEnabled = true
    this.updateValue('', false)
    this.$refs.inputElement && this.$refs.inputElement.setSelectionRange(0, 0)
  }

  private onKeyDown (ev: any) {
    this.$emit('keydown', ev)

    // If the event is actively being composed, then don't alert autofill.
    // Right now typing does not have isComposing, once that has been fixed any should be removed.
    if (!(ev as any).isComposing) {
      switch (ev.which) {
        case KeyCodes.backspace:
          this.autoFillEnabled = false
          break
        case KeyCodes.left:
        case KeyCodes.right:
          if (this.autoFillEnabled) {
            this.internalValue = this.displayValue!
            this.autoFillEnabled = false
          }
          break
        default:
          if (!this.autoFillEnabled) {
            if (this.enableAutofillOnKeyPress!.indexOf(ev.which) !== -1) {
              this.autoFillEnabled = true
            }
          }
          break
      }
    }
  };

  private onInputChanged (ev: any) {
    const value: string = this.getCurrentInputValue(ev)

    if (!this.isComposing) {
      this.tryEnableAutofill(value, this.value, ev.isComposing)
    }

    // If it is not IE11 and currently composing, update the value
    if (!(isIE11() && this.isComposing)) {
      const nativeEventComposing = ev.composed
      const isComposing = nativeEventComposing === undefined ? this.isComposing : nativeEventComposing
      this.updateValue(value, isComposing)
    }
  };

  private getCurrentInputValue (ev?: Event): string {
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
  private updateValue (newValue: string, composing: boolean) {
    // Only proceed if the value is nonempty and is different from the old value
    // This is to work around the fact that, in IE 11, inputs with a placeholder fire an onInput event on focus
    if (!newValue && newValue === this.value) {
      return
    }
    this.internalValue = this.onInputChange ? this.onInputChange(newValue, composing) : newValue
    this.displayValue = this.getDisplayValue(this.value, this.suggestedDisplayValue)
  }

  private getDisplayValue (inputValue: string, suggestedDisplayValue?: string): string {
    let displayValue = inputValue
    if (
      suggestedDisplayValue &&
      inputValue &&
      this.doesTextStartWith(suggestedDisplayValue, displayValue) &&
      this.autoFillEnabled
    ) {
      displayValue = suggestedDisplayValue
    }
    return displayValue
  }

  private doesTextStartWith (text: string, startWith: string): boolean {
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
  private tryEnableAutofill (newValue: string, oldValue: string, isComposing?: boolean, isComposed?: boolean): void {
    if (
      !isComposing &&
      newValue &&
      this.$refs.inputElement &&
      this.$refs.inputElement.selectionStart === newValue.length &&
      !this.autoFillEnabled &&
      (newValue.length > oldValue.length || isComposed)
    ) {
      this.autoFillEnabled = true
    }
  }

  render (h: CreateElement) {
    const { displayValue } = this

    return h('input', {
      ref: 'inputElement',
      attrs: {
        autoCapitalize: 'off',
        autoComplete: 'off',
        'aria-autocomplete': 'both',
        value: displayValue,
      },
      on: {
        change: this.onInputChanged,
        click: ev => this.$emit('click', ev),
      },
    })
  }
}
