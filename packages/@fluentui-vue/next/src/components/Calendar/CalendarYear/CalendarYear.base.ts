import { classNamesFunction } from '@fluentui-vue/utilities'
import { usePrevious } from '@vueuse/core'
import { type PropType, type Ref, computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { AnimationDirection } from '..'
import type { ICalendarYearProps, ICalendarYearStyleProps, ICalendarYearStyles } from './CalendarYear.types'
import { CalendarYearGrid } from './CalendarYearGrid'
import { CalendarYearHeader } from './CalendarYearHeader'
import { makeStylingProps, propsFactoryFromInterface } from '@/utils'
import { useRender } from '@/composables'

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>()

const CELL_COUNT = 12
const CELLS_PER_ROW = 4

function useAnimateBackwards(selectedYear: Ref<number | undefined>, navigatedYear: Ref<number | undefined>) {
  return computed(() => {
    const rangeYear = selectedYear.value || navigatedYear.value || new Date().getFullYear()
    const fromYear = Math.floor(rangeYear / 10) * 10

    const previousFromYear = usePrevious(fromYear)

    if (!previousFromYear.value || previousFromYear.value === fromYear)
      return undefined

    else if (previousFromYear.value > fromYear)
      return true

    else
      return false
  })
}

const enum NavigationDirection {
  Previous,
  Next,
}

function useYearRangeState(selectedYear: Ref<number | undefined>, navigatedYear: Ref<number | undefined>) {
  const fromYear = ref(0)

  watchEffect(() => {
    const rangeYear = selectedYear.value || navigatedYear.value || new Date().getFullYear()
    fromYear.value = Math.floor(rangeYear / 10) * 10
  })
  const navigate = (action: NavigationDirection) => {
    fromYear.value += (action === NavigationDirection.Next ? CELL_COUNT : -CELL_COUNT)
  }
  const toYear = computed(() => fromYear.value + CELL_COUNT - 1)

  const onNavNext = () => navigate(NavigationDirection.Next)
  const onNavPrevious = () => navigate(NavigationDirection.Previous)

  return [fromYear, toYear, onNavNext, onNavPrevious] as const
}

export const CalendarYearBase = defineComponent({
  name: 'CalendarYearBase',

  props: propsFactoryFromInterface<ICalendarYearProps>()({
    ...makeStylingProps(),
    strings: { type: Object, default: () => ({}) },

    highlightCurrentYear: { type: Boolean, default: false },
    highlightSelectedYear: { type: Boolean, default: false },

    selectedYear: { type: Number, default: undefined },
    navigatedYear: { type: Number, default: undefined },
    minYear: { type: Number, default: undefined },
    maxYear: { type: Number, default: undefined },

    onSelectYear: { type: Function, default: undefined },
    onHeaderSelect: { type: Function, default: undefined },
    animationDirection: { type: Number as PropType<AnimationDirection>, default: AnimationDirection.Horizontal },
  }, 'CalendarYearBase')(),

  setup(props, { attrs, slots }) {
    const {
      selectedYear,
      navigatedYear,
    } = toRefs(props)

    const animateBackwards = useAnimateBackwards(selectedYear, navigatedYear)
    const [fromYear, toYear, onNavNext, onNavPrevious] = useYearRangeState(selectedYear, navigatedYear)

    const classNames = computed(() => getClassNames(props.styles, {
      theme: props.theme!,
      className: props.className,
    }))

    const slotProps = computed(() => ({
      root: {
        class: classNames.value.root,
      },
      yearHeader: {
        ...props,
        fromYear: fromYear.value,
        toYear: toYear.value,
        onSelectPrev: onNavPrevious,
        onSelectNext: onNavNext,
        animateBackwards: animateBackwards.value,
      },
      yearGrid: {
        ...props,
        fromYear: fromYear.value,
        toYear: toYear.value,
        animateBackwards: animateBackwards.value,
      },
    }))

    useRender(() => h('div', slotProps.value.root, [
      h(CalendarYearHeader, slotProps.value.yearHeader),
      h(CalendarYearGrid, slotProps.value.yearGrid),
    ]))
  },
})
