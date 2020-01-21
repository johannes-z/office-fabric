import { ISpinnerProps, ISpinnerStyles } from './Spinner.types';
import BaseComponent from '../BaseComponent';
export default class Spinner extends BaseComponent<ISpinnerProps, ISpinnerStyles> {
    label: string;
    labelPosition: string;
    size: number;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
}
//# sourceMappingURL=Spinner.vue?rollup-plugin-vue=script.d.ts.map