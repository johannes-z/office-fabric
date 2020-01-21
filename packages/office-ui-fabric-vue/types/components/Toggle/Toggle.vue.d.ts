import BaseComponent from '../BaseComponent';
import { IToggleProps, IToggleStyles } from './Toggle.types';
export default class Toggle extends BaseComponent<IToggleProps, IToggleStyles> {
    checked: boolean;
    label: string;
    defaultChecked: boolean;
    disabled: boolean;
    inlineLabel: boolean;
    onText: string;
    offText: string;
    internalChecked: boolean;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
    private onCheckedChanged;
    private onClick;
}
//# sourceMappingURL=Toggle.vue?rollup-plugin-vue=script.d.ts.map