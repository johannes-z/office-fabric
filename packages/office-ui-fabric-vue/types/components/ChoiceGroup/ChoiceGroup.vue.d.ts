import BaseComponent from '../BaseComponent';
export default class ChoiceGroup extends BaseComponent {
    label: string;
    options: any[];
    value: any[];
    disabled: boolean;
    required: boolean;
    selectedOption: any;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    private onClick;
}
//# sourceMappingURL=ChoiceGroup.vue?rollup-plugin-vue=script.d.ts.map