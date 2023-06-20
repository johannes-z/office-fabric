/**
 * Defines a type made by the union of the different values that the align-items and justify-content flexbox
 * properties can take.
 * {@docCategory Stack}
 */
export type Alignment =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'baseline'
  | 'stretch'

/**
 * {@docCategory Stack}
 */
export type IStackComponent = any

// The following two types are redundant with IStackComponent but are needed until TS function return widening issue
// is resolved: https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.

/**
 * {@docCategory Stack}
 */
export type IStackTokenReturnType = ReturnType<Extract<IStackComponent['tokens'], Function>>

/**
 * {@docCategory Stack}
 */
export type IStackStylesReturnType = ReturnType<Extract<IStackComponent['styles'], Function>>

/**
 * {@docCategory Stack}
 */
export type IStackSlot = any

/**
 * {@docCategory Stack}
 */
export interface IStackSlots {
  /**
   * Defines root slot of the component.
   */
  root?: any

  /**
   * Defines a slot that is placed inside the root slot in order to achieve wrapping. Only used when the wrap
   * property is set to true.
   */
  inner?: any
}

/**
 * {@docCategory Stack}
 */
export interface IStackItemProps {
  /**
   * Defines a CSS class name used to style the StackItem.
   */
  className?: string

  /**
   * Defines how much to grow the StackItem in proportion to its siblings.
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset'

  /**
   * Defines at what ratio should the StackItem shrink to fit the available space.
   */
  shrink?: boolean | number | 'inherit' | 'initial' | 'unset'

  /**
   * Defines whether the StackItem should be prevented from shrinking.
   * This can be used to prevent a StackItem from shrinking when it is inside of a Stack that has shrinking items.
   * @defaultvalue false
   */
  disableShrink?: boolean

  /**
   * Defines how to align the StackItem along the x-axis (for vertical Stacks) or the y-axis (for horizontal Stacks).
   */
  align?: 'auto' | 'stretch' | 'baseline' | 'start' | 'center' | 'end'

  /**
   * Defines whether the StackItem should take up 100% of the height of its parent.
   * @defaultvalue true
   */
  verticalFill?: boolean

  /**
   * Defines the initial main size of the StackItem, setting the size of the content box unless otherwise set with
   * box-sizing.
   * @defaultvalue auto
   */
  basis?: React.CSSProperties['flexBasis']

  /**
   * Defines order of the StackItem.
   * @defaultvalue 0
   */
  order?: number | string
}

/**
 * {@docCategory Stack}
 */
export interface IStackItemTokens {
  /**
   * Defines the margin to be applied to the StackItem relative to its container.
   */
  margin?: number | string

  /**
   * Defines the padding to be applied to the StackItem contents relative to its border.
   */
  padding?: number | string
}

/**
 * {@docCategory Stack}
 */
export type IStackItemStyles = IComponentStyles<IStackItemSlots>
