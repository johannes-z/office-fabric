import BaseComponent from '../BaseComponent';
export default class Rating extends BaseComponent {
    size: number;
    min: number;
    max: number;
    rating: number;
    ariaLabelFormat?: string;
    iconName: string;
    unselectedIconName: string;
    disabled?: boolean;
    readonly?: boolean;
    internalValue: number;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    get ratingLevels(): number[];
    get areaLabel(): string;
    getRatingIconName(ratingLevel: number): string;
    getRatingFillPercentage(ratingLevel: number): string | undefined;
    setRating(rating: number): void;
    private onPropValueChanged;
    private onValueChanged;
}
//# sourceMappingURL=Rating.vue?rollup-plugin-vue=script.d.ts.map