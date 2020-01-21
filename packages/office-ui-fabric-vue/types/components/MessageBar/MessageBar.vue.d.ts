import BaseComponent from '../BaseComponent';
import { IMessageBarStyles } from './MessageBar.types';
export default class MessageBar extends BaseComponent {
    messageBarType: number;
    isMultiline: boolean;
    actions: boolean;
    truncated: boolean;
    expandSingleLine: boolean;
    state: {
        expandSingleLine: boolean;
    };
    private ICON_MAP;
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<IMessageBarStyles>;
    private onExpandSingleLine;
    private onClick;
}
//# sourceMappingURL=MessageBar.vue?rollup-plugin-vue=script.d.ts.map