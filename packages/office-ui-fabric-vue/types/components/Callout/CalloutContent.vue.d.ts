import BaseComponent from '../BaseComponent';
export default class CalloutContent extends BaseComponent {
    $refs: {
        hostElement: HTMLDivElement;
        calloutElement: HTMLDivElement;
    };
    target: HTMLElement;
    calloutWidth: number;
    beakWidth: number;
    minPagePadding: number;
    isBeakVisible: boolean;
    coverTarget: boolean;
    gapSpace: number;
    private internalKey;
    private positions;
    positionAttempts: number;
    created(): void;
    beforeDestroy(): void;
    updated(): void;
    mounted(): Promise<void>;
    get classNames(): any;
    get actualBeakWidth(): number;
    private get positionCss();
    private updatePosition;
    private onGlobalClick;
    private onGlobalScroll;
    private get bounds();
    private _arePositionsEqual;
    private _comparePositions;
}
//# sourceMappingURL=CalloutContent.vue?rollup-plugin-vue=script.d.ts.map