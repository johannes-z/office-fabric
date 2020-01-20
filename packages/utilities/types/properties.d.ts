/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
export declare const baseElementEvents: string[];
/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export declare const baseElementProperties: string[];
/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export declare const htmlElementProperties: string[];
/**
 * An array of LABEL tag properties and events.
 *
 * @public
 */
export declare const labelProperties: string[];
/**
 * An array of AUDIO tag properties and events.
 *
 * @public
 */
export declare const audioProperties: string[];
/**
 * An array of VIDEO tag properties and events.
 *
 * @public
 */
export declare const videoProperties: string[];
/**
 * An array of OL tag properties and events.
 *
 * @public
 */
export declare const olProperties: string[];
/**
 * An array of LI tag properties and events.
 *
 * @public
 */
export declare const liProperties: string[];
/**
 * An array of A tag properties and events.
 *
 * @public
 */
export declare const anchorProperties: string[];
/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export declare const buttonProperties: string[];
/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export declare const inputProperties: string[];
/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export declare const textAreaProperties: string[];
/**
 * An array of SELECT tag properties and events.
 *
 * @public
 */
export declare const selectProperties: string[];
export declare const optionProperties: string[];
/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */
export declare const tableProperties: string[];
/**
 * An array of TR tag properties and events.
 *
 * @public
 */
export declare const trProperties: string[];
/**
 * An array of TH tag properties and events.
 *
 * @public
 */
export declare const thProperties: string[];
/**
 * An array of TD tag properties and events.
 *
 * @public
 */
export declare const tdProperties: string[];
export declare const colGroupProperties: string[];
export declare const colProperties: string[];
/**
 * An array of FORM tag properties and events.
 *
 * @public
 */
export declare const formProperties: string[];
/**
 * An array of IFRAME tag properties and events.
 *
 * @public
 */
export declare const iframeProperties: string[];
/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export declare const imgProperties: string[];
/**
 * @deprecated Use imgProperties for img elements.
 */
export declare const imageProperties: string[];
/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
export declare const divProperties: string[];
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */
export declare function getNativeProps<T>(props: {}, allowedPropNames: string[], excludedPropNames?: string[]): T;
//# sourceMappingURL=properties.d.ts.map