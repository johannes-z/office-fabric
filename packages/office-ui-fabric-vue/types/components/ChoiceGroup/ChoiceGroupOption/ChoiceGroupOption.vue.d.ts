import BaseComponent from '../../BaseComponent';
export default class ChoiceGroupOption extends BaseComponent {
    id: string;
    text: string;
    iconProps: any;
    imageSrc: any;
    checked: boolean;
    disabled: boolean;
    imageSize: any;
    focused: boolean;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
}
//# sourceMappingURL=ChoiceGroupOption.vue?rollup-plugin-vue=script.d.ts.map