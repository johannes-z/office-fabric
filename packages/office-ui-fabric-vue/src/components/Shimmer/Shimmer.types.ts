import { IStyle } from '@uifabric/merge-styles'

export interface IShimmerProps {
}

export interface IShimmerStyles {
  /** Refers to the root wrapper element. */
  root?: IStyle;

  /** Refers to wrapper element of the shimmer only. */
  shimmerWrapper?: IStyle;

  /** Refers to gradient element of the shimmer animation only. */
  shimmerGradient?: IStyle;

  /** Refers to wrapper element of the children only. */
  dataWrapper?: IStyle;

  /** Styles for the hidden helper element to aid with screen readers. */
  screenReaderText?: IStyle;
}

/**
 * Describes the default heights for shimmer elements when omitted in implementation.
 * {@docCategory Shimmer}
 */
export enum ShimmerElementsDefaultHeights {
  /**
   * Default height of the line element when not provided by user: 16px
   */
  line = 16,

  /**
   * Default height of the gap element when not provided by user: 16px
   */
  gap = 16,

  /**
   * Default height of the circle element when not provided by user: 24px
   */
  circle = 24
}
