import { IStyleFunctionOrObject, IStyleSet } from '@uifabric/merge-styles';
import Vue, { VueConstructor } from 'vue';
export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
    styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}
export interface ICustomizableProps {
    /**
     * Name of scope, which can be targeted using the Customizer.
     */
    scope: string;
    /**
     * List of fields which can be customized.
     * @defaultvalue [ 'theme', 'styles' ]
     */
    fields?: string[];
}
export declare function styled(Component: VueConstructor<Vue>, baseStyles: IStyleFunctionOrObject<any, any>, getProps?: (props: any) => Partial<any>, customizable?: ICustomizableProps, pure?: boolean): VueConstructor<Vue>;
//# sourceMappingURL=styled.d.ts.map