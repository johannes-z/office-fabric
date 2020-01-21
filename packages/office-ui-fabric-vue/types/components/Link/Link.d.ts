import { ILinkProps, ILinkStyles } from './Link.types';
import { CreateElement, RenderContext, VNode } from 'vue';
import StatelessComponent from '../StatelessComponent';
export default class Link extends StatelessComponent<ILinkProps, ILinkStyles> {
    disabled: boolean;
    href: string;
    render(h: CreateElement, context: RenderContext<any>): VNode;
}
//# sourceMappingURL=Link.d.ts.map