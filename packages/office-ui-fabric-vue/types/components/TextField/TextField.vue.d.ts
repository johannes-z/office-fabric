import BaseComponent from '../BaseComponent';
export default class TextField extends BaseComponent {
    $refs: {
        textElement: HTMLTextAreaElement | HTMLInputElement;
    };
    multiline: boolean;
    resizable: boolean;
    autoAdjustHeight: boolean;
    borderless: boolean;
    disabled: boolean;
    underlined: boolean;
    readonly: boolean;
    required: boolean;
    label: string;
    value: string;
    errorMessage: string;
    placeholder: string;
    description: string;
    isActive: boolean;
    internalValue: string;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    mounted(): void;
    updated(): void;
    private onPropValueChanged;
    private onValueChanged;
    private onMultilineChanged;
    private adjustInputHeight;
    private onFocus;
}
//# sourceMappingURL=TextField.vue?rollup-plugin-vue=script.d.ts.map