import { IBreadcrumbProps, IBreadcrumbStyles, IBreadcrumbItem } from './Breadcrumb.types';
import BaseComponent from '../BaseComponent';
export default class Breadcrumb extends BaseComponent<IBreadcrumbProps, IBreadcrumbStyles> {
    items: IBreadcrumbItem[];
    get classNames(): import("@uifabric/merge-styles").IProcessedStyleSet<IBreadcrumbStyles>;
    private onBreadcrumbClicked;
}
//# sourceMappingURL=Breadcrumb.vue?rollup-plugin-vue=script.d.ts.map