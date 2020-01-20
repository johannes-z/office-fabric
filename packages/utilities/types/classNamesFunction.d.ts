import { IStyleSet, IProcessedStyleSet, IStyleFunctionOrObject } from '@uifabric/merge-styles';
export interface IClassNamesFunctionOptions {
    /**
     * Disables class caching for scenarios where styleProp parts mutate frequently.
     */
    disableCaching?: boolean;
}
/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 *
 * Note that the props you pass in on every render should be in the same order and
 * immutable (numbers, strings, and booleans). This will allow the results to be memoized. Violating
 * these will cause extra recalcs to occur.
 */
export declare function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(options?: IClassNamesFunctionOptions): (getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined, styleProps?: TStyleProps) => IProcessedStyleSet<TStyleSet>;
//# sourceMappingURL=classNamesFunction.d.ts.map