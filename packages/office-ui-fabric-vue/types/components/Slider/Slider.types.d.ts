import { IStyle } from '@uifabric/merge-styles';
export interface ISliderProps {
}
export interface ISliderStyles {
    /**
     * Style set for the root element.
     */
    root: IStyle;
    /**
     * Style set for the title label above the slider.
     */
    titleLabel: IStyle;
    /**
     * Style set for the container of the slider.
     */
    container: IStyle;
    /**
     * Style set for the actual box containting interactive elements of the slider.
     */
    slideBox: IStyle;
    /**
     * Style set for element that contains all the lines.
     */
    line: IStyle;
    /**
     * Style set for thumb of the slider.
     */
    thumb: IStyle;
    /**
     * Style set for both active and inactive sections of the line.
     */
    lineContainer: IStyle;
    /**
     * Style set for active portion of the line.
     */
    activeSection: IStyle;
    /**
     * Style set for inactive portion of the line.
     */
    inactiveSection: IStyle;
    /**
     * Style set for value label on right/below of the slider.
     */
    valueLabel: IStyle;
    /**
     * Style set for tick on 0 on number line. This element only shows up when originFromZero prop is true.
     */
    zeroTick: IStyle;
}
//# sourceMappingURL=Slider.types.d.ts.map