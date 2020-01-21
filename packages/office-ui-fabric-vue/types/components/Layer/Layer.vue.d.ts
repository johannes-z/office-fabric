import BaseComponent from '../BaseComponent';
export default class Layer extends BaseComponent {
    hostId: string;
    append: boolean;
    marker: HTMLDivElement;
    hasTarget: boolean;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    mounted(): void;
    beforeDestroy(): void;
    createElement(): void;
    private getHost;
}
//# sourceMappingURL=Layer.vue?rollup-plugin-vue=script.d.ts.map