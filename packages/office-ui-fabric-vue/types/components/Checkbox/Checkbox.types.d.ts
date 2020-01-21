import { IStyle } from '@uifabric/merge-styles';
export interface ICheckboxProps {
}
export interface ICheckboxStyles {
    /**
     * Style for the root element (a button) of the checkbox component in the default enabled/unchecked state.
     */
    root?: IStyle;
    /**
     * INTERNAL: This is mostly an internal implementation detail which you should avoid styling.
     * This refers to the <input type="checkbox"> element that is typically hidden and not rendered on screen.
     */
    input?: IStyle;
    /**
     * Style for the label part (contains the customized checkbox + text) when enabled.
     */
    label?: IStyle;
    /**
     * Style for checkbox in its default unchecked/enabled state.
     */
    checkbox?: IStyle;
    /**
     * Style for the checkmark in the default enabled/unchecked state.
     */
    checkmark?: IStyle;
    /**
     * Style for text appearing with the checkbox in its default enabled state.
     */
    text?: IStyle;
}
//# sourceMappingURL=Checkbox.types.d.ts.map