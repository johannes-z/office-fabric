import { IModalProps, IModalStyles } from './Modal.types';
import BaseComponent from '../BaseComponent';
export default class Modal extends BaseComponent<IModalProps, IModalStyles> {
    layerProps: any;
    containerClassName: string;
    scrollableContentClassName: string;
    isVisible: boolean;
    hasBeenOpened: any;
    modalRectangleTop: any;
    topOffsetFixed: any;
    isModeless: any;
    dragOptions: any;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<any>;
}
//# sourceMappingURL=Modal.vue?rollup-plugin-vue=script.d.ts.map