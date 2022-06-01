import { IResizeGroupProps, ResizeGroupDirection } from './ResizeGroup.types'
import Vue, { CreateElement, RenderContext } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'

const RESIZE_DELAY = 16

export interface IResizeGroupState {
  /**
   * Final data used to render proper sized component
   */
  renderedData?: any;

  /**
   * Data to render in a hidden div for measurement
   */
  dataToMeasure?: any;

  /**
   * Set to true when the content container might have new dimensions and should
   * be remeasured.
   */
  measureContainer?: boolean;

  /**
   * Are we resizing to accommodate having more or less available space?
   * The 'grow' direction is when the container may have more room than the last render,
   * such as when a window resize occurs. This means we will try to fit more content in the window.
   * The 'shrink' direction is when the contents don't fit in the container and we need
   * to find a transformation of the data that makes everything fit.
   */
  resizeDirection?: 'grow' | 'shrink';
}

/**
 * Returns a simple object is able to store measurements with a given key.
 */
export const getMeasurementCache = () => {
  const measurementsCache: { [key: string]: number } = {}

  return {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any): number | undefined => {
      if (data && data.cacheKey && measurementsCache.hasOwnProperty(data.cacheKey)) {
        return measurementsCache[data.cacheKey]
      }

      return undefined
    },
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number): void => {
      if (data.cacheKey) {
        measurementsCache[data.cacheKey] = measurement
      }
    },
  }
}

/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export const getNextResizeGroupStateProvider = (measurementCache = getMeasurementCache()) => {
  const _measurementCache = measurementCache
  let _containerDimension: number | undefined

  /**
   * Gets the width/height of the data rendered in a hidden div.
   * @param measuredData - The data corresponding to the measurement we wish to take.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data. Only called when the measurement
   * is not in the cache.
   */
  function _getMeasuredDimension (measuredData: any, getElementToMeasureDimension: () => number): number {
    const cachedDimension = _measurementCache.getCachedMeasurement(measuredData)
    if (cachedDimension !== undefined) {
      return cachedDimension
    }

    const measuredDimension = getElementToMeasureDimension()
    _measurementCache.addMeasurementToCache(measuredData, measuredDimension)
    return measuredDimension
  }

  /**
   * Will get the next IResizeGroupState based on the current data while trying to shrink contents
   * to fit in the container.
   * @param data - The initial data point to start measuring.
   * @param onReduceData - Function that transforms the data into something that should render with less width/height.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data. Only called when the measurement
   * is not in the cache.
   */
  function _shrinkContentsUntilTheyFit (
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
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data. Only called when the measurement
   * is not in the cache.
   */
  function _growDataUntilItDoesNotFit (
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
   * Handles an update to the container width/eheight. Should only be called when we knew the previous container width/height.
   * @param newDimension - The new width/height of the container.
   * @param fullDimensionData - The initial data passed in as a prop to resizeGroup.
   * @param renderedData - The data that was rendered prior to the container size changing.
   * @param onGrowData - Set to true if the Resize group has an onGrowData function.
   */
  function _updateContainerDimension (
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
      } else {
        nextState = {
          resizeDirection: 'shrink',
          dataToMeasure: fullDimensionData,
        }
      }
    } else {
      nextState = {
        resizeDirection: 'shrink',
        dataToMeasure: renderedData,
      }
    }
    _containerDimension = newDimension
    return { ...nextState, measureContainer: false }
  }

  function getNextState (
    props: IResizeGroupProps,
    currentState: IResizeGroupState,
    getElementToMeasureDimension: () => number,
    newContainerDimension?: number,
  ): IResizeGroupState | undefined {
    // If there is no new container width/height or data to measure, there is no need for a new state update
    if (newContainerDimension === undefined && currentState.dataToMeasure === undefined) {
      return undefined
    }

    if (newContainerDimension) {
      // If we know what the last container size was and we rendered data at that width/height, we can do an optimized render
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
          ..._growDataUntilItDoesNotFit(currentState.dataToMeasure, props.onGrowData, getElementToMeasureDimension, props.onReduceData),
        }
      } else {
        nextState = {
          ...nextState,
          ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureDimension),
        }
      }
    }

    return nextState
  }

  /** Function that determines if we need to render content for measurement based on the measurement cache contents. */
  function shouldRenderDataForMeasurement (dataToMeasure: any | undefined): boolean {
    if (!dataToMeasure || _measurementCache.getCachedMeasurement(dataToMeasure) !== undefined) {
      return false
    }

    return true
  }

  function getInitialResizeGroupState (data: any): IResizeGroupState {
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
const hiddenDivStyles: any = { position: 'fixed', visibility: 'hidden' }
const hiddenParentStyles: any = { position: 'relative' }

@Component
export class ResizeGroupBase extends BaseComponent {
  $refs!: {
    root: HTMLDivElement
    updateHiddenDiv: HTMLDivElement
    initialHiddenDiv: HTMLDivElement
  }

  private nextResizeGroupStateProvider = getNextResizeGroupStateProvider()
  private hasRenderedContent = false
  dataToMeasure = {}
  measureContainer? = false
  renderedData = {}
  resizeDirection? = 'grow'

  @Prop() data!: any
  @Prop({ type: Number, default: ResizeGroupDirection.horizontal }) direction!: any
  @Prop({ type: Function, default: null }) dataDidRender?: (renderedData: any) => void

  created () {
    const state = this.nextResizeGroupStateProvider.getInitialResizeGroupState(this.data)

    this.dataToMeasure = state.dataToMeasure
    this.measureContainer = state.measureContainer
    this.renderedData = state.renderedData
    this.resizeDirection = state.resizeDirection
  }

  mounted () {
    this.events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }))
    this.componentDidUpdate()
  }

  updated () {
    this.componentDidUpdate()
  }

  private componentDidUpdate () {
    console.log('componentDidUpdate')
    this.dataToMeasure = this.data
    this.resizeDirection = 'grow'
    this.measureContainer = true

    if (this.renderedData) {
      this.hasRenderedContent = true
      if (this.dataDidRender) {
        this.dataDidRender(this.renderedData)
      }
    }
    this._afterComponentRendered(this.direction)
  }

  private _afterComponentRendered (direction?: ResizeGroupDirection): void {
    this._async.requestAnimationFrame(() => {
      let containerDimension
      if (this.measureContainer && this.$refs.root) {
        const boundingRect = this.$refs.root.getBoundingClientRect()
        containerDimension = direction && direction === ResizeGroupDirection.vertical ? boundingRect.height : boundingRect.width
      }
      const nextState = this.nextResizeGroupStateProvider.getNextState(
        this.$props as any,
        this.$data,
        () => {
          const refToMeasure = !this.hasRenderedContent ? this.$refs.initialHiddenDiv : this.$refs.updateHiddenDiv
          if (!refToMeasure) {
            return 0
          }
          return direction && direction === ResizeGroupDirection.vertical
            ? refToMeasure.scrollHeight
            : refToMeasure.scrollWidth
        },
        containerDimension,
      )

      if (nextState) {
        this.dataToMeasure = nextState.dataToMeasure
        this.measureContainer = nextState.measureContainer
        this.renderedData = nextState.renderedData
        this.resizeDirection = nextState.resizeDirection
      }
    })
  }

  private _onResize (): void {
    if (this.$refs.root) {
      this.measureContainer = true
    }
  }

  render (h: CreateElement) {
    const { className, dataToMeasure, renderedData } = this

    const dataNeedsMeasuring = this.nextResizeGroupStateProvider.shouldRenderDataForMeasurement(dataToMeasure)

    const isInitialMeasure = !this.hasRenderedContent && dataNeedsMeasuring

    return h('div', { class: className, attrs: { ref: 'root' } }, [
      h('div', { style: hiddenParentStyles }, [
        dataNeedsMeasuring && !isInitialMeasure && h('div', {
          ref: 'updateHiddenDiv',
          style: hiddenDivStyles,
        }, 'Test'),

        h('div', {
          ref: 'initialHiddenDiv',
          style: isInitialMeasure ? hiddenDivStyles : undefined,
        }, this.$slots.default),
      ]),
    ])
  }
}
