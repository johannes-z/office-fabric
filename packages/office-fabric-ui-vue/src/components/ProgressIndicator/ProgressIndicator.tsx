import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProgressIndicatorProps, IProgressIndicatorStyles } from './ProgressIndicator.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement, RenderContext } from 'vue'

const getClassNames = classNamesFunction<IProgressIndicatorProps, IProgressIndicatorStyles>()

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01

@Component({
  // @ts-ignore
  functional: true,
})
export default class ProgressIndicator extends BaseComponent<IProgressIndicatorProps, IProgressIndicatorStyles> {
  @Prop({ type: Boolean, default: false }) progressHidden!: boolean
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: Number, default: 0 }) percentComplete!: number
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) description!: string

  @Prop({ type: Number, default: 2 }) barHeight!: number

  render (h: CreateElement, context: RenderContext) {
    const { className, indeterminate, theme, barHeight, description, progressHidden } = context.props
    const classNames = getClassNames(context.props.styles, {
      className,
      indeterminate,
      theme,
      barHeight,
    })

    const { percentComplete } = context.props
    const progressBarStyles = {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    }

    return (
      <div class={classNames.root}>
        <div class={classNames.itemName}>
          { context.props.label }
        </div>

        {
          !progressHidden
            ? <div class={classNames.itemProgress}>
              <div class={classNames.progressTrack} />
              <div class={classNames.progressBar} style={progressBarStyles} />
            </div>
            : null
        }

        {description ? <div class={classNames.itemDescription}>{ description }</div> : null}
      </div>
    )
  }
}
