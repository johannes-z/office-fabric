import { isIE11, KeyCodes } from '@uifabric-vue/utilities'
import type { IAutofill, IAutofillProps } from './Autofill.types'
import Vue, { CreateElement, VNode } from 'vue'

export interface IAutofillState {
  inputValue: string;
  isComposing: boolean;
}

interface ICursorLocation {
  start: number;
  end: number;
  dir: 'forward' | 'backward' | 'none' | undefined;
}

const SELECTION_FORWARD = 'forward'
const SELECTION_BACKWARD = 'backward'

export const Autofill = Vue.extend({
  name: 'Autofill',

  props: {
    defaultVisibleValue: { type: String, default: '' },
    suggestedDisplayValue: { type: String, default: '' },
    preventValueSelection: { type: Boolean, default: false },
    enableAutofillOnKeyPress: { type: Array, default: () => [KeyCodes.down, KeyCodes.up] as KeyCodes[] },

    value: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },

  data () {
    return {
      inputValue: this.defaultVisibleValue || '',

      autoFillEnabled: true,
      isComposing: false,

      timeout: -1,
    }
  },

  computed: {
    cursorLocation (): number | null {
      if (this.$refs.input) {
        const inputElement = this.$refs.input as HTMLInputElement
        if (inputElement.selectionDirection !== SELECTION_FORWARD) {
          return inputElement.selectionEnd
        } else {
          return inputElement.selectionStart
        }
      } else {
        return -1
      }
    },
    cursor (): ICursorLocation | null {
      const inputElement = this.$refs.input as HTMLInputElement

      if (inputElement && inputElement.selectionStart !== this.internalValue.length) {
        return {
          start: inputElement.selectionStart ?? inputElement.value.length,
          end: inputElement.selectionEnd ?? inputElement.value.length,
          dir: (inputElement.selectionDirection as 'forward') || 'backward' || 'none',
        }
      }
      return null
    },
    isValueSelected (): boolean {
      const inputElement = this.$refs.input as HTMLInputElement | undefined
      return Boolean(inputElement && inputElement.selectionStart !== inputElement.selectionEnd)
    },
    internalValue (): string {
      return this.controlledValue || this.inputValue || ''
    },
    displayValue (): string {
      if (this.autoFillEnabled) {
        return getDisplayValue(this.internalValue, this.suggestedDisplayValue)
      }

      return this.internalValue
    },
    controlledValue (): string | undefined {
      const value = this.value
      if (value === undefined || typeof value === 'string') {
        return value
      }
      return undefined
    },
  },

  watch: {
    internalValue (value) {
      const inputElement = this.$refs.input as HTMLInputElement
      let differenceIndex = 0
      const { suggestedDisplayValue } = this

      if (
        this.autoFillEnabled &&
        value &&
        suggestedDisplayValue &&
        doesTextStartWith(suggestedDisplayValue, value)
      ) {
        const shouldSelectFullRange = false

        if (shouldSelectFullRange && inputElement) {
          this.$nextTick(() => {
            inputElement.setSelectionRange(0, suggestedDisplayValue.length, SELECTION_BACKWARD)
          })
        } else {
          while (
            differenceIndex < value.length &&
            value[differenceIndex].toLocaleLowerCase() === suggestedDisplayValue[differenceIndex].toLocaleLowerCase()
          ) {
            differenceIndex++
          }
          if (differenceIndex > 0 && inputElement) {
            this.$nextTick(() => {
              inputElement.setSelectionRange(
                differenceIndex,
                suggestedDisplayValue.length,
                SELECTION_BACKWARD,
              )
            })
          }
        }
      } else if (inputElement) {
        if (this.cursor !== null && !this.autoFillEnabled && !this.isComposing) {
          this.$nextTick(() => {
            inputElement.setSelectionRange(this.cursor!.start, this.cursor!.end, this.cursor!.dir)
          })
        }
      }
    },
  },

  beforeDestroy () {
    clearTimeout(this.timeout)
  },

  methods: {
    focus (): void {
      const inputElement = this.$refs.input as HTMLInputElement
      inputElement && inputElement.focus()
    },
    clear (): void {
      const inputElement = this.$refs.input as HTMLInputElement
      this.autoFillEnabled = false
      this.updateValue('', false)
      inputElement && inputElement.setSelectionRange(0, 0)
    },
    getCurrentInputValue (ev?: Event): string {
      const inputElement = this.$refs.input as HTMLInputElement
      if (ev && ev.target && (ev.target as HTMLInputElement).value) {
        return (ev.target as HTMLInputElement).value
      } else if (inputElement && inputElement.value) {
        return inputElement.value
      } else {
        return ''
      }
    },
    onCompositionStart () {
      this.isComposing = true
      this.autoFillEnabled = false
    },
    onCompositionUpdate () {
      if (isIE11()) {
        this.updateValue(this.getCurrentInputValue(), true)
      }
    },
    onCompositionEnd () {
      const inputValue = this.getCurrentInputValue()
      this.tryEnableAutofill(inputValue, this.internalValue, false, true)
      this.isComposing = false

      this.timeout = window.setTimeout(() => {
        this.updateValue(this.getCurrentInputValue(), false)
      }, 0)
    },
    updateValue (newValue: string, composing: boolean) {
      if (!newValue && newValue === this.internalValue) {
        return
      }

      this.inputValue = newValue

      this.$emit('input', newValue, composing)

      // const { onInputChange, onInputValueChange } = this;
      // if (onInputChange) {
      //   newValue = onInputChange?.(newValue, composing) || '';
      // }

      // this.setState({ inputValue: newValue }, () => onInputValueChange?.(newValue, composing));
    },
    tryEnableAutofill (newValue: string, oldValue: string, isComposing?: boolean, isComposed?: boolean): void {
      const inputElement = this.$refs.input as HTMLInputElement
      if (
        !isComposing &&
        newValue &&
        inputElement &&
        inputElement.selectionStart === newValue.length &&
        !this.autoFillEnabled &&
        (newValue.length > oldValue.length || isComposed)
      ) {
        this.autoFillEnabled = true
      }
    },
    onInput (ev) {
      const value: string = this.getCurrentInputValue(ev)

      if (!this.isComposing) {
        this.tryEnableAutofill(value, this.internalValue, ev.isComposing)
      }

      // If it is not IE11 and currently composing, update the value
      if (!(isIE11() && this.isComposing)) {
        const nativeEventComposing = ev.isComposing
        const isComposing = nativeEventComposing === undefined ? this.isComposing : nativeEventComposing
        this.updateValue(value, isComposing)
      }
    },
    onKeyDown (ev: KeyboardEvent) {
      if (ev.isComposing) return
      switch (ev.which) {
        case KeyCodes.backspace:
          this.autoFillEnabled = false
          break
        case KeyCodes.left:
        case KeyCodes.right:
          if (this.autoFillEnabled) {
            this.inputValue = this.suggestedDisplayValue || ''
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
    },
    onClick () {
      if (this.internalValue && this.internalValue !== '' && this.autoFillEnabled) {
        this.autoFillEnabled = false
      }
    },
  },

  render (h: CreateElement): VNode {
    return h('input', {
      ref: 'input',
      attrs: {
        autoCapitalize: 'off',
        autoComplete: 'off',
        'aria-autocomplete': 'both',
        'data-lpignore': true,
        disabled: this.disabled,
        ...this.$attrs,
      },
      domProps: {
        value: this.displayValue,
      },
      on: {
        compositionstart: this.onCompositionStart,
        compositionupdate: this.onCompositionUpdate,
        compositionend: this.onCompositionEnd,
        input: this.onInput,
        keydown: this.onKeyDown,
        click: this.onClick,
      },
    })
  },
})

function getDisplayValue (inputValue: string, suggestedDisplayValue?: string): string {
  let displayValue = inputValue
  if (suggestedDisplayValue && inputValue && doesTextStartWith(suggestedDisplayValue, displayValue)) {
    displayValue = suggestedDisplayValue
  }
  return displayValue
}

function doesTextStartWith (text: string, startWith: string): boolean {
  if (!text || !startWith) {
    return false
  }

  return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0
}
