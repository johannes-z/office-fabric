import BaseComponent from '../BaseComponent';
import { CreateElement, VNode } from 'vue';
export default class Popup extends BaseComponent {
    $refs: {
        current: HTMLDivElement;
    };
    shouldRestoreFocus: boolean;
    style: any;
    private _originalFocusedElement;
    private _async;
    private needsVerticalScrollBar;
    private _containsFocus;
    private _disposables;
    created(): void;
    mounted(): void;
    updated(): void;
    beforeDestroy(): void;
    render(h: CreateElement, context: any): VNode;
    private _onKeyDown;
    private _updateScrollBarAsync;
    private _getScrollBar;
    private _onFocus;
    private _onBlur;
}
//# sourceMappingURL=Popup.vue?rollup-plugin-vue=script.d.ts.map