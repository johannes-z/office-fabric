import { IProgressIndicatorProps, IProgressIndicatorStyles } from './ProgressIndicator.types';
import BaseComponent from '../BaseComponent';
export default class ProgressIndicator extends BaseComponent<IProgressIndicatorProps, IProgressIndicatorStyles> {
    progressHidden: boolean;
    indeterminate: boolean;
    percentComplete: number;
    label: string;
    description: string;
    barHeight: number;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<IProgressIndicatorStyles>;
    get progressBarStyles(): {
        width: string | undefined;
        transition: string | undefined;
    };
}
//# sourceMappingURL=ProgressIndicator.vue?rollup-plugin-vue=script.d.ts.map