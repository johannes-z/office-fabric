import { classNamesFunction, memoizeFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { IShimmerElement, ShimmerElementsDefaultHeights, ShimmerElementType } from '../Shimmer.types'
import { ShimmerLine } from '../ShimmerLine/ShimmerLine'
import { IShimmerCircleStyles } from '../ShimmerCircle/ShimmerCircle.types'
import { IShimmerGapStyles } from '../ShimmerGap/ShimmerGap.types'
import { IShimmerLineStyles } from '../ShimmerLine/ShimmerLine.types'
import { IRawStyle } from '@uifabric/styling'
import { ShimmerCircle } from '../ShimmerCircle/ShimmerCircle'
import { ShimmerGap } from '../ShimmerGap/ShimmerGap'
import { IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles } from './ShimmerElementsGroup.types'
import { h } from '@vue/composition-api'

const getClassNames = classNamesFunction<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>()

@Component
export default class ShimmerElementsGroupBase extends StatelessComponent {
  @Prop({ type: Array, default: undefined }) shimmerElements!: any[]
  @Prop({ type: String, default: 'auto' }) width!: string
  @Prop({ type: Boolean, default: false }) flexWrap!: boolean

  render (h: CreateElement, ctx: RenderContext) {
    const {
      styles,
      width,
      shimmerElements,
      rowHeight = findMaxElementHeight(shimmerElements || []),
      flexWrap = false,
      theme,
      backgroundColor,
    } = ctx.props

    const classNames = getClassNames(styles!, {
      theme: theme!,
      flexWrap,
    })

    return (
      <div style={{ width: width }} class={classNames.root}>
        {getRenderedElements(shimmerElements, backgroundColor, rowHeight)}
      </div>
    )
  }
}

function getRenderedElements (
  shimmerElements?: IShimmerElement[],
  backgroundColor?: string,
  rowHeight?: number,
): any {
  const renderedElements: any = shimmerElements ? (
    shimmerElements.map(
      // false positive
      // eslint-disable-next-line array-callback-return
      (element: IShimmerElement, index: number): JSX.Element => {
        const { type, ...filteredElem } = element
        const { verticalAlign, height } = filteredElem
        const styles = getElementStyles(verticalAlign, type, height, backgroundColor, rowHeight)

        switch (element.type) {
          case ShimmerElementType.circle:
            return <ShimmerCircle key={index} {...{ props: { ...filteredElem, styles } }} />
          case ShimmerElementType.gap:
            return <ShimmerGap key={index} {...{ props: { ...filteredElem, styles } }} />
          case ShimmerElementType.line:
            return <ShimmerLine key={index} {...{ props: { ...filteredElem, styles } }} />
        }
      },
    )
  ) : (
    // @ts-ignore
    <ShimmerLine height={ShimmerElementsDefaultHeights.line} />
  )

  return renderedElements
}

const getElementStyles = memoizeFunction(
  (
    verticalAlign: 'center' | 'bottom' | 'top' | undefined,
    elementType: ShimmerElementType,
    elementHeight: number | undefined,
    backgroundColor?: string,
    rowHeight?: number,
  ): IShimmerCircleStyles | IShimmerGapStyles | IShimmerLineStyles => {
    const dif: number = rowHeight && elementHeight ? rowHeight - elementHeight : 0

    let borderStyle: IRawStyle | undefined

    if (!verticalAlign || verticalAlign === 'center') {
      borderStyle = {
        borderBottomWidth: `${dif ? Math.floor(dif / 2) : 0}px`,
        borderTopWidth: `${dif ? Math.ceil(dif / 2) : 0}px`,
      }
    } else if (verticalAlign && verticalAlign === 'top') {
      borderStyle = {
        borderBottomWidth: `${dif}px`,
        borderTopWidth: `0px`,
      }
    } else if (verticalAlign && verticalAlign === 'bottom') {
      borderStyle = {
        borderBottomWidth: `0px`,
        borderTopWidth: `${dif}px`,
      }
    }

    if (backgroundColor) {
      switch (elementType) {
        case ShimmerElementType.circle:
          return {
            root: { ...borderStyle, borderColor: backgroundColor },
            svg: { fill: backgroundColor },
          }
        case ShimmerElementType.gap:
          return {
            root: { ...borderStyle, borderColor: backgroundColor, backgroundColor: backgroundColor },
          }
        case ShimmerElementType.line:
          return {
            root: { ...borderStyle, borderColor: backgroundColor },
            topLeftCorner: { fill: backgroundColor },
            topRightCorner: { fill: backgroundColor },
            bottomLeftCorner: { fill: backgroundColor },
            bottomRightCorner: { fill: backgroundColor },
          }
      }
    }

    return {
      root: borderStyle,
    }
  },
)

/**
 * User should not worry to provide which of the elements is the highest so we do the calculation for him.
 * Plus if user forgot to specify the height we assign their defaults.
 */
function findMaxElementHeight (shimmerElements: IShimmerElement[]): number {
  const shimmerElementsDefaulted: IShimmerElement[] = shimmerElements.map(
    (element: IShimmerElement): IShimmerElement => {
      switch (element.type) {
        case ShimmerElementType.circle:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.circle
          }
          break
        case ShimmerElementType.line:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.line
          }
          break
        case ShimmerElementType.gap:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.gap
          }
          break
      }
      return element
    },
  )

  const rowHeight = shimmerElementsDefaulted.reduce((acc: number, next: IShimmerElement): number => {
    return next.height ? (next.height > acc ? next.height : acc) : acc
  }, 0)

  return rowHeight
}
