/**
 * {@docCategory IStyleBase}
 */
export declare type IStyleBase = string | false | null | undefined;
/**
   * IStyleObject extends a raw style objects, but allows selectors to be defined
   * under the selectors node.
   * @public
   * {@docCategory IStyle}
   */
export declare type IStyle = IStyleBase | IStyleBaseArray;
/**
   * {@docCategory IStyleBaseArray}
   */
export interface IStyleBaseArray extends Array<IStyle> {
}
