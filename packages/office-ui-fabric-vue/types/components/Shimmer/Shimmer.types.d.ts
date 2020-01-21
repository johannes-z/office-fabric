import { IStyle } from '@uifabric/merge-styles';
export interface IShimmerProps {
}
export interface IShimmerStyles {
    /** Refers to the root wrapper element. */
    root?: IStyle;
    /** Refers to wrapper element of the shimmer only. */
    shimmerWrapper?: IStyle;
    /** Refers to gradient element of the shimmer animation only. */
    shimmerGradient?: IStyle;
    /** Refers to wrapper element of the children only. */
    dataWrapper?: IStyle;
    /** Styles for the hidden helper element to aid with screen readers. */
    screenReaderText?: IStyle;
}
//# sourceMappingURL=Shimmer.types.d.ts.map