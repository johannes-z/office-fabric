import { debounce, throttle } from '@fluentui-vue/utilities'
import { type PropType, type VNode, computed, nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { defineComponent, h } from 'vue'
import type { IResizeGroupProps } from './ResizeGroup.types'
import { ResizeGroupDirection } from './ResizeGroup.types'
import { asSlotProps, useStylingProps } from '@/utils'

const RESIZE_DELAY = 16

export interface IResizeGroupState {
  /**
   * Final data used to render proper sized component
   */
  renderedData?: any

  /**
   * Data to render in a hidden div for measurement
   */
  dataToMeasure?: any

  /**
   * Set to true when the content container might have new dimensions and should
   * be remeasured.
   */
  measureContainer?: boolean

  /**
   * Are we resizing to accommodate having more or less available space?
   * The 'grow' direction is when the container may have more room than the last render,
   * such as when a window resize occurs. This means we will try to fit more content in the window.
   * The 'shrink' direction is when the contents don't fit in the container and we need
   * to find a transformation of the data that makes everything fit.
   */
  resizeDirection?: 'grow' | 'shrink'
}

/**
 * Returns a simple object is able to store measurements with a given key.
 */
export function getMeasurementCache() {
  const measurementsCache: { [key: string]: number } = {}

  return {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any): number | undefined => {
      if (data && data.cacheKey && measurementsCache.hasOwnProperty(data.cacheKey))
        return measurementsCache[data.cacheKey]

      return undefined
    },
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number): void => {
      if (data.cacheKey)
        measurementsCache[data.cacheKey] = measurement
    },
  }
}

/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export function getNextResizeGroupStateProvider(measurementCache = getMeasurementCache()) {
  const _measurementCache = measurementCache
  let _containerDimension: number | undefined

  /**
   * Gets the width/height of the data rendered in a hidden div.
   * @param measuredData - The data corresponding to the measurement we wish to take.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data.
   * Only called when the measurement is not in the cache.
   */
  function _getMeasuredDimension(measuredData: any, getElementToMeasureDimension: () => number): number {
    const cachedDimension = _measurementCache.getCachedMeasurement(measuredData)
    if (cachedDimension !== undefined)
      return cachedDimension

    const measuredDimension = getElementToMeasureDimension()
    _measurementCache.addMeasurementToCache(measuredData, measuredDimension)
    return measuredDimension
  }

  /**
   * Will get the next IResizeGroupState based on the current data while trying to shrink contents
   * to fit in the container.
   * @param data - The initial data point to start measuring.
   * @param onReduceData - Function that transforms the data into something that should render with less width/height.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data.
   * Only called when the measurement is not in the cache.
   */
  function _shrinkContentsUntilTheyFit(
    data: any,
    onReduceData: (prevData: any) => any,
    getElementToMeasureDimension: () => number,
  ): IResizeGroupState {
    let dataToMeasure = data
    let measuredDimension: number | undefined = _getMeasuredDimension(data, getElementToMeasureDimension)

    while (measuredDimension > _containerDimension!) {
      const nextMeasuredData = onReduceData(dataToMeasure)

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onReduceData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure,
          resizeDirection: undefined,
          dataToMeasure: undefined,
        }
      }

      measuredDimension = _measurementCache.getCachedMeasurement(nextMeasuredData)

      // If the measurement isn't in the cache, we need to rerender with some data in a hidden div
      if (measuredDimension === undefined) {
        return {
          dataToMeasure: nextMeasuredData,
          resizeDirection: 'shrink',
        }
      }

      dataToMeasure = nextMeasuredData
    }

    return {
      renderedData: dataToMeasure,
      resizeDirection: undefined,
      dataToMeasure: undefined,
    }
  }

  /**
   * This function should be called when the state changes in a manner that might allow for more content to fit
   * on the screen, such as the window width/height growing.
   * @param data - The initial data point to start measuring.
   * @param onGrowData - Function that transforms the data into something that may take up more space when rendering.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data.
   * Only called when the measurement is not in the cache.
   */
  function _growDataUntilItDoesNotFit(
    data: any,
    onGrowData: (prevData: any) => any,
    getElementToMeasureDimension: () => number,
    onReduceData: (prevData: any) => any,
  ): IResizeGroupState {
    let dataToMeasure = data
    let measuredDimension: number | undefined = _getMeasuredDimension(data, getElementToMeasureDimension)

    while (measuredDimension < _containerDimension!) {
      const nextMeasuredData = onGrowData(dataToMeasure)

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onGrowData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure,
          resizeDirection: undefined,
          dataToMeasure: undefined,
        }
      }

      measuredDimension = _measurementCache.getCachedMeasurement(nextMeasuredData)
      // If the measurement isn't in the cache, we need to rerender with some data in a hidden div
      if (measuredDimension === undefined) {
        return {
          dataToMeasure: nextMeasuredData,
        }
      }

      dataToMeasure = nextMeasuredData
    }

    // Once the loop is done, we should now shrink until the contents fit.
    return {
      resizeDirection: 'shrink',
      ..._shrinkContentsUntilTheyFit(dataToMeasure, onReduceData, getElementToMeasureDimension),
    }
  }

  /**
   * Handles an update to the container width/height.
   * Should only be called when we knew the previous container width/height.
   * @param newDimension - The new width/height of the container.
   * @param fullDimensionData - The initial data passed in as a prop to resizeGroup.
   * @param renderedData - The data that was rendered prior to the container size changing.
   * @param onGrowData - Set to true if the Resize group has an onGrowData function.
   */
  function _updateContainerDimension(
    newDimension: number,
    fullDimensionData: any,
    renderedData: any,
    onGrowData?: (prevData: any) => any,
  ): IResizeGroupState {
    let nextState: IResizeGroupState
    if (newDimension > _containerDimension!) {
      if (onGrowData) {
        nextState = {
          resizeDirection: 'grow',
          dataToMeasure: onGrowData(renderedData),
        }
      }
      else {
        nextState = {
          resizeDirection: 'shrink',
          dataToMeasure: fullDimensionData,
        }
      }
    }
    else {
      nextState = {
        resizeDirection: 'shrink',
        dataToMeasure: renderedData,
      }
    }
    _containerDimension = newDimension
    return { ...nextState, measureContainer: false }
  }

  function getNextState(
    props: IResizeGroupProps,
    currentState: IResizeGroupState,
    getElementToMeasureDimension: () => number,
    newContainerDimension?: number,
  ): IResizeGroupState | undefined {
    // If there is no new container width/height or data to measure, there is no need for a new state update
    if (newContainerDimension === undefined && currentState.dataToMeasure === undefined)
      return undefined

    if (newContainerDimension) {
      // If we know the last container size and we rendered data at that width/height, we can do an optimized render
      if (_containerDimension && currentState.renderedData && !currentState.dataToMeasure) {
        return {
          ...currentState,
          ..._updateContainerDimension(newContainerDimension, props.data, currentState.renderedData, props.onGrowData),
        }
      }

      // If we are just setting the container width/height for the first time, we can't do any optimizations
      _containerDimension = newContainerDimension
    }

    let nextState: IResizeGroupState = {
      ...currentState,
      measureContainer: false,
    }

    if (currentState.dataToMeasure) {
      if (currentState.resizeDirection === 'grow' && props.onGrowData) {
        nextState = {
          ...nextState,
          ..._growDataUntilItDoesNotFit(
            currentState.dataToMeasure,
            props.onGrowData,
            getElementToMeasureDimension,
            props.onReduceData,
          ),
        }
      }
      else {
        nextState = {
          ...nextState,
          ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureDimension),
        }
      }
    }

    return nextState
  }

  /** Function that determines if we need to render content for measurement based on the measurement cache contents. */
  function shouldRenderDataForMeasurement(dataToMeasure: any | undefined): boolean {
    if (!dataToMeasure || _measurementCache.getCachedMeasurement(dataToMeasure) !== undefined)
      return false

    return true
  }

  function getInitialResizeGroupState(data: any): IResizeGroupState {
    return {
      dataToMeasure: { ...data },
      resizeDirection: 'grow',
      measureContainer: true,
    }
  }

  return {
    getNextState,
    shouldRenderDataForMeasurement,
    getInitialResizeGroupState,
  }
}

// Styles for the hidden div used for measurement
const hiddenDivStyles = { position: 'fixed', visibility: 'hidden' }
const hiddenParentStyles = { position: 'relative' }

export const ResizeGroupBase = defineComponent({
  name: 'ResizeGroupBase',

  props: {
    ...useStylingProps(),

    data: { type: Object, required: true },
    onReduceData: { type: Function as PropType<(prevData: any) => any>, required: true },
    onGrowData: { type: Function as PropType<(prevData: any) => any>, required: true },
    direction: { type: Number as PropType<ResizeGroupDirection>, default: ResizeGroupDirection.horizontal },

    getItemRefs: { type: Function as PropType<(prevData: any) => any>, default: null },
  },

  setup(props, { attrs, slots, expose }) {
    const {
      data,
      direction,
      className,
    } = toRefs(props)

    const nextResizeGroupStateProvider = getNextResizeGroupStateProvider()

    const hasRenderedContent = ref(false)
    const measureContainer = ref(true)
    const dataNeedsMeasuring = ref(true)
    const state = ref<IResizeGroupState>({
      dataToMeasure: undefined,
      renderedData: undefined,
      measureContainer: undefined,
      resizeDirection: undefined,
    })

    const isInitialMeasure = computed(() => {
      return !hasRenderedContent.value && dataNeedsMeasuring.value
    })

    watch(data, (value) => {
      state.value = Object.assign({}, nextResizeGroupStateProvider.getInitialResizeGroupState(value))
    }, { immediate: true })

    watch(() => state.value.dataToMeasure, (value) => {
      dataNeedsMeasuring.value = nextResizeGroupStateProvider.shouldRenderDataForMeasurement(value)
    })
    watch(() => state.value.renderedData, (value) => {
      hasRenderedContent.value = !!value
    })

    watch(state, (value) => {
      if (!value.dataToMeasure)
        return
      afterComponentRendered(direction.value)
    })

    const root = ref<HTMLDivElement | null>(null)
    const initialHiddenDiv = ref<HTMLDivElement | null>(null)
    const updateHiddenDiv = ref<HTMLDivElement | null>(null)

    const refToMeasure = computed(() => !hasRenderedContent.value
      ? initialHiddenDiv.value
      : updateHiddenDiv.value)

    const onResize = () => {
      if (root.value)
        measureContainer.value = true
      afterComponentRendered(direction.value)
    }
    const afterComponentRendered = (direction?: ResizeGroupDirection) => {
      window.requestAnimationFrame(async () => {
        let containerDimension
        if (measureContainer.value && root.value) {
          const boundingRect = root.value.getBoundingClientRect()
          containerDimension = (direction && direction === ResizeGroupDirection.vertical)
            ? boundingRect.height
            : boundingRect.width
        }
        const nextState = nextResizeGroupStateProvider.getNextState(
          props,
          state.value,
          () => {
            if (!refToMeasure.value)
              return 0

            return (direction && direction === ResizeGroupDirection.vertical)
              ? refToMeasure.value.scrollHeight
              : refToMeasure.value.scrollWidth
          },
          containerDimension,
        )
        if (nextState)
          state.value = nextState
      })
    }

    const resizeObserver = new ResizeObserver(
      debounce(onResize, RESIZE_DELAY, false),
    )

    onMounted(async () => {
      afterComponentRendered(direction.value)
      resizeObserver.observe(root.value!)
    })

    onBeforeUnmount(() => {
      resizeObserver.disconnect()
    })

    const slotProps = computed(() => asSlotProps({
      root: {
        ref: root,
        class: className.value,
      },
      parent: {
        style: hiddenParentStyles,
      },
      hidden: {
        ref: updateHiddenDiv,
        style: hiddenDivStyles,
      },
      content: {
        ref: initialHiddenDiv,
        style: isInitialMeasure.value && hiddenDivStyles,
      },
    }))

    const onRenderData = (data: any) => slots.default?.(data)

    expose({
      remeasure: () => onResize(),
    })

    return () => h('div', slotProps.value.root, [
      h('div', slotProps.value.parent, [
        dataNeedsMeasuring.value && !isInitialMeasure.value && h('div', slotProps.value.hidden, [
          onRenderData(state.value.dataToMeasure),
        ]),

        h('div', slotProps.value.content, [
          isInitialMeasure.value
            ? onRenderData(state.value.dataToMeasure)
            : (state.value.renderedData && onRenderData(state.value.renderedData)),
        ]),
      ]),
    ])
  },
})
