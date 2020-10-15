import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProgressIndicatorProps, IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>()

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01

@Component
export class ProgressIndicatorBase extends BaseComponent<IProgressIndicatorProps, IProgressIndicatorStyles> {
  @Prop({ type: Boolean, default: false }) progressHidden!: boolean
  @Prop({ type: Number, default: undefined }) percentComplete!: number
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) description!: string

  @Prop({ type: Number, default: 2 }) barHeight!: number

  get internalPercentComplete () {
    return typeof this.percentComplete === 'number'
      ? Math.min(100, Math.max(0, this.percentComplete * 100))
      : undefined
  }

  get classNames () {
    const { styles, theme, className, internalPercentComplete, barHeight } = this
    return getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: internalPercentComplete === undefined,
    })
  }

  get progressBarStyles () {
    const { internalPercentComplete } = this
    return {
      width: internalPercentComplete !== undefined ? internalPercentComplete + '%' : undefined,
      transition: internalPercentComplete !== undefined && internalPercentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    }
  }

  render (h: CreateElement) {
    const { classNames, label, progressHidden, progressBarStyles, description } = this
    const $label = label && h('div', { class: classNames.itemName }, label)

    const $progress = !progressHidden &&
    h('div', { class: classNames.itemProgress }, [
      h('div', { class: classNames.progressTrack }),
      h('div', { class: classNames.progressBar, style: progressBarStyles }),
    ])

    const $description = description && h('div', { class: classNames.itemDescription }, description)

    return h('div', { class: classNames.root }, [
      $label,
      $progress,
      $description,
    ])
  }
}
