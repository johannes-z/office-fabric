import { CreateElement, VNode } from 'vue';
import BaseComponent from '../BaseComponent';
import { INavLinkGroup, INavProps, INavStyles } from './Nav.types';
export declare function isRelativeUrl(url: string): boolean;
export default class Nav extends BaseComponent<INavProps, INavStyles> {
    groups: INavLinkGroup[];
    selectedKey: string;
    isOnTop: boolean;
    isGroupCollapsed: {
        [key: string]: boolean;
    };
    internalSelectedKey: string;
    render(h: CreateElement): VNode | null;
    private renderGroup;
    private renderLinks;
    private renderLink;
    private renderCompositeLink;
    private onLinkExpandClicked;
    private renderNavLink;
    private onNavLinkClicked;
    private preventBounce;
    private isGroupExpanded;
    private toggleCollapsed;
}
//# sourceMappingURL=Nav.d.ts.map