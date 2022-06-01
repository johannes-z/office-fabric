import { asSlotProps, useStylingProps } from '@/utils/'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, RenderContext, VNode } from 'vue'
import { IProgressIndicatorSlots, IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types'

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>()

const ZERO_THRESHOLD = 0.01

export const ProgressIndicatorBase = Vue.extend({
  name: 'ProgressIndicatorBase',

  functional: true,

  props: {
    ...useStylingProps(),

    progressHidden: { type: Boolean, default: false },
    percentComplete: { type: Number, default: undefined },
    label: { type: String, default: null },
    description: { type: String, default: null },
    barHeight: { type: Number, default: 2 },
    ariaValueText: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
  },

  render (h: CreateElement, ctx: RenderContext & { scopedSlots: IProgressIndicatorSlots }): VNode {
    const { styles, className, theme, ariaValueText, ariaLabel, barHeight, label, progressHidden, description } = ctx.props

    const percentComplete = typeof ctx.props.percentComplete === 'number'
      ? Math.min(100, Math.max(0, ctx.props.percentComplete * 100))
      : undefined

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: percentComplete === undefined,
    })

    const progressBarStyles = {
      width: percentComplete !== undefined ? percentComplete + '%' : undefined,
      transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined,
    }

    const ariaValueMin = percentComplete !== undefined ? 0 : undefined
    const ariaValueMax = percentComplete !== undefined ? 100 : undefined
    const ariaValueNow = percentComplete !== undefined ? Math.floor(percentComplete!) : undefined

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        class: classNames.root,
      },
      label: {
        class: classNames.itemName,
      },
      itemProgress: {
        class: classNames.itemProgress,
      },
      progressTrack: {
        class: classNames.progressTrack,
        style: [
          { height: `${barHeight}px` },
        ],
      },
      progressBar: {
        class: classNames.progressBar,
        style: [
          {
            height: `${barHeight}px`,
            ...progressBarStyles,
          },
        ],
        attrs: {
          role: 'progressbar',
          'aria-describedby': description ? (0 + '-label') : undefined,
          'aria-label': ariaLabel,
          'aria-labelledby': label ? (0 + '-description') : undefined,
          'aria-valuemin': ariaValueMin,
          'aria-valuemax': ariaValueMax,
          'aria-valuenow': ariaValueNow,
          'aria-valuetext': ariaValueText,
        },
      },
      itemDescription: {
        class: classNames.itemDescription,
      },
    })

    const _onRenderProgress = () => h('div', slotProps.itemProgress, [
      h('div', slotProps.progressTrack),
      h('div', slotProps.progressBar),
    ])
    const onRenderProgress = ctx.scopedSlots.progress || _onRenderProgress

    return h('div', slotProps.root, [
      (ctx.scopedSlots.label || label) &&
        h('div', slotProps.label, ctx.scopedSlots.label?.() || label),

      !progressHidden && onRenderProgress({
        ...ctx.props,
        percentComplete,
        defaultRender: _onRenderProgress,
      }),

      (ctx.scopedSlots.description || description) &&
        h('div', slotProps.itemDescription, ctx.scopedSlots.description?.() || description),
    ])
  },
})
