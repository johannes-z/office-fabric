import Vue from 'vue';
import { css } from '@uifabric-vue/utilities';
export default abstract class StatelessComponent<TProps = {}, IStyles = {}> extends Vue {
    readonly className: string;
    readonly styles: any;
    readonly theme: any;
    css: typeof css;
}
//# sourceMappingURL=StatelessComponent.d.ts.map