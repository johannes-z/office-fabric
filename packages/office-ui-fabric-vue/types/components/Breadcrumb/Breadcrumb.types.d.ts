import { IStyle } from '@uifabric/merge-styles';
export interface IBreadcrumbProps {
}
/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumbItem {
    /**
     * Text to display to the user for the breadcrumb item.
     */
    text: string;
    /**
     * Callback issued when the breadcrumb item is selected.
     */
    onClick?: any;
    /**
     * Url to navigate to when this breadcrumb item is clicked.
     */
    href?: string;
}
export interface IBreadcrumbStyles {
    root?: IStyle;
    list?: IStyle;
    listItem?: IStyle;
    chevron?: IStyle;
    overflow?: IStyle;
    overflowButton?: IStyle;
    itemLink?: IStyle;
    item?: IStyle;
}
//# sourceMappingURL=Breadcrumb.types.d.ts.map