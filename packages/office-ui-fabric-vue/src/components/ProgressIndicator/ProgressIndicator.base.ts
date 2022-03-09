import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@fluentui/style-utilities'
import { classNamesFunction, getId } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { IProgressIndicatorProps, IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types'

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>()

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01

export const ProgressIndicatorBase = Vue.extend({
  name: 'ProgressIndicatorBase',

  props: {
    ...withThemeableProps(),

    progressHidden: { type: Boolean, default: false },
    percentComplete: { type: Number, default: undefined },
    label: { type: String, default: null },
    description: { type: String, default: null },
    barHeight: { type: Number, default: 2 },
    ariaValueText: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
  } as MappedType<IProgressIndicatorProps>,

  computed: {
    classNames (): IProcessedStyleSet<IProgressIndicatorStyles> {
      const { styles, theme, className, percentComplete, barHeight } = this
      return getClassNames(styles, {
        theme: theme!,
        className,
        barHeight,
        indeterminate: percentComplete === undefined,
      })
    },
    uid (): string {
      return getId()
    },
  },

  render (h): VNode {
    const { ariaValueText, ariaLabel, classNames, label, progressHidden, description } = this

    const percentComplete = typeof this.percentComplete === 'number'
      ? Math.min(100, Math.max(0, this.percentComplete * 100))
      : undefined

    const progressBarStyles = {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    }

    const ariaValueMin = percentComplete !== undefined ? 0 : undefined
    const ariaValueMax = percentComplete !== undefined ? 100 : undefined
    const ariaValueNow = percentComplete !== undefined ? Math.floor(percentComplete!) : undefined

    return h('div', { class: classNames.root }, [
      (this.$scopedSlots.label || label) &&
        h('div', { class: classNames.itemName }, this.$scopedSlots.label?.({}) || label),

      !progressHidden && h('div', { class: classNames.itemProgress }, [
        h('div', { class: classNames.progressTrack }),
        h('div', {
          class: classNames.progressBar,
          style: progressBarStyles,
          attrs: {
            role: 'progressbar',
            'aria-describedby': description ? (this.uid + '-label') : undefined,
            'aria-label': ariaLabel,
            'aria-labelledby': label ? (this.uid + '-description') : undefined,
            'aria-valuemin': ariaValueMin,
            'aria-valuemax': ariaValueMax,
            'aria-valuenow': ariaValueNow,
            'aria-valuetext': ariaValueText,
          },
        }),
      ]),

      (this.$scopedSlots.description || description) &&
        h('div', { class: classNames.itemDescription }, this.$scopedSlots.description?.({}) || description),
    ])
  },
})
