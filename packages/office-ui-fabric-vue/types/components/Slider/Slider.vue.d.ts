import BaseComponent from '../BaseComponent';
export declare const ONKEYDOWN_TIMEOUT_DURATION = 1000;
export default class Slider extends BaseComponent {
    $refs: {
        sliderLine: HTMLDivElement;
    };
    label: string;
    disabled: boolean;
    vertical: boolean;
    snapToStep: boolean;
    min: number;
    max: number;
    step: number;
    value: number;
    defaultValue: number;
    showValue: boolean;
    originFromZero: boolean;
    private internalValue?;
    private renderedValue?;
    private onKeyDownTimer;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    get thumbOffsetPercent(): number;
    get zeroOffsetPercent(): number;
    get lengthString(): "height" | "width";
    private onMouseDown;
    private onMouseUp;
    private onMove;
    private getPosition;
    private updateValue;
    private onKeyDown;
    private clearOnKeyDownTimer;
    private setOnKeyDownTimer;
}
//# sourceMappingURL=Slider.vue?rollup-plugin-vue=script.d.ts.map