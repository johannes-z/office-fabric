import BaseComponent from '../BaseComponent';
import { IShimmerProps, IShimmerStyles } from './Shimmer.types';
export default class Shimmer extends BaseComponent<IShimmerProps, IShimmerStyles> {
    shimmerColors: any;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<IShimmerStyles>;
}
//# sourceMappingURL=Shimmer.vue?rollup-plugin-vue=script.d.ts.map