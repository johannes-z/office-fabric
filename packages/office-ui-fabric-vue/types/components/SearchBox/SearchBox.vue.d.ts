import BaseComponent from '../BaseComponent';
export default class SearchBox extends BaseComponent {
    $refs: {
        input: HTMLInputElement;
    };
    underlined?: boolean;
    defaultValue?: string;
    placeholder?: string;
    value: string;
    disableAnimation?: boolean;
    disabled?: boolean;
    iconName: string;
    isActive: boolean;
    internalValue: string;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    private onPropValueChanged;
    private onValueChanged;
    submit(): void;
    clearInput(): void;
}
//# sourceMappingURL=SearchBox.vue?rollup-plugin-vue=script.d.ts.map