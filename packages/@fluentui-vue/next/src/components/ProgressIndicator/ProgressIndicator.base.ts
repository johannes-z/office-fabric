import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h } from 'vue'
import type { IProgressIndicatorProps, type IProgressIndicatorStyleProps, type IProgressIndicatorStyles } from './ProgressIndicator.types'
import { asSlotProps, makeStylingProps, propsFactory, propsFactoryFromInterface } from '@/utils/'

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>()

const ZERO_THRESHOLD = 0.01

export const makeProgressIndicatorProps = propsFactoryFromInterface<IProgressIndicatorProps>()({
  ...makeStylingProps(),

  progressHidden: { type: Boolean, default: false },
  percentComplete: { type: Number, default: undefined },
  label: { type: String, default: null },
  description: { type: String, default: null },
  barHeight: { type: Number, default: 2 },
  ariaValueText: { type: String, default: undefined },
  ariaLabel: { type: String, default: undefined },
}, 'ProgressIndicator')

export const ProgressIndicatorBase = defineComponent({
  name: 'ProgressIndicatorBase',

  props: makeProgressIndicatorProps(),

  setup(props, { attrs, emit, slots }) {
    const percentComplete = computed(() => {
      const percentComplete = +props.percentComplete!
      return (typeof percentComplete === 'number' && !Number.isNaN(percentComplete))
        ? Math.min(100, Math.max(0, percentComplete * 100))
        : undefined
    })

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme,
      className: props.className,
      barHeight: props.barHeight,
      indeterminate: percentComplete.value === undefined,
    }))

    const progressBarStyles = computed(() => ({
      width: percentComplete.value !== undefined ? `${percentComplete.value}%` : undefined,
      transition: (percentComplete.value !== undefined && percentComplete.value < ZERO_THRESHOLD) ? 'none' : undefined,
    }))

    const ariaValueMin = percentComplete.value !== undefined ? 0 : undefined
    const ariaValueMax = percentComplete.value !== undefined ? 100 : undefined
    const ariaValueNow = percentComplete.value !== undefined ? Math.floor(percentComplete.value) : undefined

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
        class: classNames.value.root,
      },
      label: {
        class: classNames.value.itemName,
      },
      itemProgress: {
        class: classNames.value.itemProgress,
      },
      progressTrack: {
        class: classNames.value.progressTrack,
        style: [
          { height: `${props.barHeight}px` },
        ],
      },
      progressBar: {
        'class': classNames.value.progressBar,
        'style': [
          {
            height: `${props.barHeight}px`,
            ...progressBarStyles.value,
          },
        ],
        'role': 'progressbar',
        'aria-describedby': props.description ? (`${0}-label`) : undefined,
        'aria-label': props.ariaLabel,
        'aria-labelledby': props.label ? (`${0}-description`) : undefined,
        'aria-valuemin': ariaValueMin,
        'aria-valuemax': ariaValueMax,
        'aria-valuenow': ariaValueNow,
        'aria-valuetext': props.ariaValueText,
      },
      itemDescription: {
        class: classNames.value.itemDescription,
      },
    }))

    const onRenderProgress = slots.progress ?? (() => h('div', slotProps.value.itemProgress, [
      h('div', slotProps.value.progressTrack),
      h('div', slotProps.value.progressBar),
    ]))

    return () => h('div', slotProps.value.root, [
      (slots.label || props.label)
        && h('div', slotProps.value.label, slots.label?.() || props.label),

      !props.progressHidden && onRenderProgress({
        ...props,
        percentComplete: percentComplete.value,
        defaultRender: onRenderProgress,
      }),

      (slots.description || props.description)
        && h('div', slotProps.value.itemDescription, slots.description?.() || props.description),
    ])
  },

})
