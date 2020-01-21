import { ILabelProps, ILabelStyles } from './Label.types';
import { CreateElement, VNode } from 'vue';
import StatelessComponent from '../StatelessComponent';
export default class Label extends StatelessComponent<ILabelProps, ILabelStyles> {
    disabled: boolean;
    required: boolean;
    render(h: CreateElement, context: any): VNode;
}
//# sourceMappingURL=Label.d.ts.map