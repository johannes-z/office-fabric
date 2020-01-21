import { IStyle } from '@uifabric/merge-styles';
/**
 * {@docCategory SpinButton}
 */
export interface ISpinButtonStyles {
    /**
     * Styles for the root of the spin button component.
     */
    root: IStyle;
    /**
     * Style for the label wrapper element of the component.
     * The label wrapper contains the icon and the label.
     */
    labelWrapper: IStyle;
    /**
     * Style override when the label is positioned at the start.
     */
    labelWrapperStart: IStyle;
    /**
     * Style override when the label is positioned at the end.
     */
    labelWrapperEnd: IStyle;
    /**
     * Style override when the label is positioned at the top.
     */
    labelWrapperTop: IStyle;
    /**
     * Style override when the label is positioned at the bottom.
     */
    labelWrapperBottom: IStyle;
    /**
     * Style for the icon.
     */
    icon: IStyle;
    /**
     * Style for the icon.
     */
    iconDisabled: IStyle;
    /**
     * Style for the label text
     */
    label: IStyle;
    /**
     * Style for the label text
     * @deprecated Disabled styles taken care by `Label` component.
     */
    labelDisabled: IStyle;
    /**
     * Style for spinButtonWrapper when enabled.
     */
    spinButtonWrapper: IStyle;
    /**
     * Style override when label is positioned at the top/bottom.
     */
    spinButtonWrapperTopBottom: IStyle;
    /**
     * Style override when spinButton is enabled/hovered.
     */
    spinButtonWrapperHovered: IStyle;
    /**
     * Style override when spinButton is enabled/focused.
     */
    spinButtonWrapperFocused: IStyle;
    /**
     * Style override when spinButton is disabled.
     */
    spinButtonWrapperDisabled: IStyle;
    /**
     * Styles for the input.
     */
    input: IStyle;
    /**
     * Style override for ::selection
     */
    inputTextSelected: IStyle;
    /**
     * Style override when spinButton is disabled.
     */
    inputDisabled: IStyle;
    /**
     * Styles for the arrowButtonsContainer
     */
    arrowButtonsContainer: IStyle;
    /**
     * Style override for the arrowButtonsContainer when spin button is disabled.
     */
    arrowButtonsContainerDisabled: IStyle;
}
//# sourceMappingURL=SpinButton.types.d.ts.map