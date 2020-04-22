import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProgressIndicatorProps, IProgressIndicatorStyles } from './ProgressIndicator.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<IProgressIndicatorProps, IProgressIndicatorStyles>()

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01

@Component
export class ProgressIndicatorBase extends BaseComponent<IProgressIndicatorProps, IProgressIndicatorStyles> {
  @Prop({ type: Boolean, default: false }) progressHidden!: boolean
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: Number, default: 0 }) percentComplete!: number
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) description!: string

  @Prop({ type: Number, default: 2 }) barHeight!: number

  get classNames () {
    const { className, indeterminate, theme, barHeight } = this
    return getClassNames(this.styles, {
      className,
      indeterminate,
      theme,
      barHeight,
    })
  }

  get progressBarStyles () {
    const { percentComplete } = this
    return {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    }
  }

  render () {
    const { classNames, label, progressHidden, progressBarStyles, description } = this
    return (
      <div class={classNames.root}>
        {label && (<div class={classNames.itemName}>{ label }</div>)}

        {!progressHidden && (
          <div class={classNames.itemProgress}>
            <div class={classNames.progressTrack} />
            <div class={classNames.progressBar} style={progressBarStyles} />
          </div>
        )}

        {description && (<div class={classNames.itemDescription}>{ description }</div>)}
      </div>
    )
  }
}
