import { Vue } from 'vue-property-decorator';
export default class Autofill extends Vue {
    $refs: {
        inputElement: HTMLInputElement;
    };
    defaultVisibleValue: string;
    suggestedDisplayValue: string;
    onInputChange: (value: string, composing: boolean) => any;
    _autoFillEnabled: boolean;
    _isComposing: boolean;
    _value: string;
    displayValue: string;
    get cursorLocation(): number | null;
    private _onInputChanged;
    private _getCurrentInputValue;
    /**
     * Updates the current input value as well as getting a new display value.
     * @param newValue - The new value from the input
     */
    private _updateValue;
    private _getDisplayValue;
    private _doesTextStartWith;
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
    private _tryEnableAutofill;
}
//# sourceMappingURL=Autofill.vue?rollup-plugin-vue=script.d.ts.map