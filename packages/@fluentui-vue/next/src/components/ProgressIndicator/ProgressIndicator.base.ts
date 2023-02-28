import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, watch } from 'vue'
import type { IProgressIndicatorSlots, IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types'
import { asSlotProps, useStylingProps } from '@/utils/'

const getClassNames = classNamesFunction<IProgressIndicatorStyleProps, IProgressIndicatorStyles>()

const ZERO_THRESHOLD = 0.01

export const ProgressIndicatorBase = defineComponent({
  name: 'ProgressIndicatorBase',

  props: {
    ...useStylingProps(),

    progressHidden: { type: Boolean, default: false },
    percentComplete: { type: [Number, String], default: undefined },
    label: { type: String, default: null },
    description: { type: String, default: null },
    barHeight: { type: Number, default: 2 },
    ariaValueText: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
  },

  setup(props, { attrs, emit, slots }) {
    const { styles, className, theme, ariaValueText, ariaLabel, barHeight, label, progressHidden, description } = props

    const percentComplete = computed(() => {
      const percentComplete = +props.percentComplete
      return (typeof percentComplete === 'number' && !isNaN(percentComplete))
        ? Math.min(100, Math.max(0, props.percentComplete * 100))
        : undefined
    })

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      barHeight,
      indeterminate: percentComplete.value === undefined,
    })

    const progressBarStyles = computed(() => ({
      width: percentComplete.value !== undefined ? `${percentComplete.value}%` : undefined,
      transition: percentComplete.value !== undefined && percentComplete.value < ZERO_THRESHOLD ? 'none' : undefined,
    }))

    const ariaValueMin = percentComplete.value !== undefined ? 0 : undefined
    const ariaValueMax = percentComplete.value !== undefined ? 100 : undefined
    const ariaValueNow = percentComplete.value !== undefined ? Math.floor(percentComplete.value!) : undefined

    const slotProps = computed(() => asSlotProps({
      root: {
        ...attrs,
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
        'class': classNames.progressBar,
        'style': [
          {
            height: `${barHeight}px`,
            ...progressBarStyles.value,
          },
        ],
        'role': 'progressbar',
        'aria-describedby': description ? (`${0}-label`) : undefined,
        'aria-label': ariaLabel,
        'aria-labelledby': label ? (`${0}-description`) : undefined,
        'aria-valuemin': ariaValueMin,
        'aria-valuemax': ariaValueMax,
        'aria-valuenow': ariaValueNow,
        'aria-valuetext': ariaValueText,
      },
      itemDescription: {
        class: classNames.itemDescription,
      },
    }))

    const onRenderProgress = () => h('div', slotProps.value.itemProgress, [
      h('div', slotProps.value.progressTrack),
      h('div', slotProps.value.progressBar),
    ])

    return () => h('div', slotProps.value.root, [
      (slots.label || label)
        && h('div', slotProps.value.label, slots.label?.() || label),

      !progressHidden && (slots.progress || onRenderProgress)({
        ...props,
        percentComplete: percentComplete.value,
        defaultRender: onRenderProgress,
      }),

      (slots.description || description)
        && h('div', slotProps.value.itemDescription, slots.description || description),
    ])
  },

})
