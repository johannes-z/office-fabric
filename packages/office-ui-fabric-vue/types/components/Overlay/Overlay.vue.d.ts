import { IOverlayProps, IOverlayStyles } from './Overlay.types';
import BaseComponent from '../BaseComponent';
export default class Overlay extends BaseComponent<IOverlayProps, IOverlayStyles> {
    dark: boolean;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<import("@uifabric/merge-styles").IStyleSet<unknown>>;
}
//# sourceMappingURL=Overlay.vue?rollup-plugin-vue=script.d.ts.map