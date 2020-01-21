import BaseComponent from '../BaseComponent';
import { IconFontSizes } from '@uifabric/styling';
declare enum PanelVisibilityState {
    closed = 0,
    animatingOpen = 1,
    open = 2,
    animatingClosed = 3
}
export default class Panel extends BaseComponent {
    headerText: string;
    focusTrapZoneProps: any;
    headerClassName: any;
    type: any;
    hasCloseButton: boolean;
    isFooterSticky: boolean;
    isFooterAtBottom: boolean;
    isOnRightSide: boolean;
    isOpen: boolean;
    isHiddenOnDismiss: boolean;
    isBlocking: boolean;
    IconFontSizes: typeof IconFontSizes;
    visibility: PanelVisibilityState;
    get classNames(): import("@uifabric/styling").IProcessedStyleSet<import("@uifabric/styling").IStyleSet<unknown>>;
}
export {};
//# sourceMappingURL=Panel.vue?rollup-plugin-vue=script.d.ts.map