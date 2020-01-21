import BaseComponent from '../BaseComponent';
import { RectangleEdge } from '@uifabric-vue/utilities';
export default class Dropdown extends BaseComponent {
    $refs: {
        dropdown: HTMLDivElement;
    };
    options: any[];
    selectedOptions: any[];
    label: string;
    placeholder: string;
    errorMessage: string;
    required: boolean;
    disabled: boolean;
    multiSelect: boolean;
    multiSelectDelimiter: string;
    dropdownWidth: number;
    panelProps: any;
    calloutProps: any;
    isOpen: boolean;
    calloutRenderEdge: RectangleEdge | null;
    created(): void;
    get classNames(): any;
    get multiSelectItemStyles(): any;
    get hasErrorMessage(): boolean | "";
    private select;
    private onPositioned;
}
//# sourceMappingURL=Dropdown.vue?rollup-plugin-vue=script.d.ts.map