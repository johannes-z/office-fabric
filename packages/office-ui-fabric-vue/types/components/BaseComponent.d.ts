import Vue from 'vue';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
import { css } from '@uifabric-vue/utilities';
export default abstract class BaseComponent<TProps = {}, IStyles = {}> extends Vue {
    readonly className?: string;
    readonly styles?: any;
    readonly theme: any;
    componentRef: HTMLElement | null;
    css: typeof css;
    mounted(): void;
    protected get classNames(): IProcessedStyleSet<IStyles>;
}
//# sourceMappingURL=BaseComponent.d.ts.map