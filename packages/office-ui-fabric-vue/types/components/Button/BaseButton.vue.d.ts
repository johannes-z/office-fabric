import BaseComponent from '../BaseComponent';
export default class BaseButton extends BaseComponent<any, any> {
    href: string;
    checked: boolean;
    disabled: boolean;
    variantClassName: string;
    iconProps: any;
    secondaryText: string;
    get component(): 'a' | 'button';
    get classNames(): any;
}
//# sourceMappingURL=BaseButton.vue?rollup-plugin-vue=script.d.ts.map