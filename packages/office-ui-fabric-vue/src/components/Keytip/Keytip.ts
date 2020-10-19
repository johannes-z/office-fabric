import { mergeOverflows, ktpTargetFromSequences } from '../../utilities/keytips/KeytipUtils'
import { Callout, ICalloutProps } from '../Callout'
import { DirectionalHint } from '../ContextualMenu'
import { IKeytipProps } from './Keytip.types'
import { KeytipContent } from './KeytipContent'
import { getCalloutStyles, getCalloutOffsetStyles } from './Keytip.styles'
import BaseComponent from '../BaseComponent'
import { Prop } from 'vue-property-decorator'
import { Point } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 */
export class Keytip extends BaseComponent {
  @Prop({ type: Array, default: undefined }) keySequences!: string[]
  @Prop({ type: Object, default: undefined }) offset!: Point
  @Prop({ type: Array, default: undefined }) overflowSetSequence!: string[]
  @Prop({ type: Object, default: undefined }) calloutProps!: ICalloutProps

  public render (h: CreateElement): JSX.Element {
    const { keySequences, offset, overflowSetSequence } = this
    let { calloutProps } = this

    let keytipTarget: string
    // Take into consideration the overflow sequence
    if (overflowSetSequence) {
      keytipTarget = ktpTargetFromSequences(mergeOverflows(keySequences, overflowSetSequence))
    } else {
      keytipTarget = ktpTargetFromSequences(keySequences)
    }

    if (offset) {
      // Set callout to top-left corner, will be further positioned in
      // getCalloutOffsetStyles
      calloutProps = {
        ...calloutProps,
        coverTarget: true,
        directionalHint: DirectionalHint.topLeftEdge,
      }
    }

    if (!calloutProps || calloutProps.directionalHint === undefined) {
      // Default callout directional hint to BottomCenter
      calloutProps = {
        ...calloutProps,
        directionalHint: DirectionalHint.bottomCenter,
      }
    }

    return h(
      Callout,
      {
        attrs: {
          ...calloutProps,
          isBeakVisible: false,
          doNotLayer: true,
          minPagePadding: 0,
          styles: offset ? getCalloutOffsetStyles(offset) : getCalloutStyles,
          preventDismissOnScroll: true,
          target: keytipTarget,
        },
      },
      [h(KeytipContent, { props: this.$props })],
    )
  }
}
