import { ICheckboxProps, ICheckboxStyles } from './Checkbox.types';
import BaseComponent from '../BaseComponent';
export default class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxStyles> {
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    required: boolean;
    label: string;
    boxSide: string;
    private internalValue;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<ICheckboxStyles>;
    private onValueChanged;
}
//# sourceMappingURL=Checkbox.vue?rollup-plugin-vue=script.d.ts.map