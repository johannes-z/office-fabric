import Vue, { PropType, VNode } from 'vue'
import { asSlotProps, useStylingProps } from '@/utils'
import { ResizeGroupDirection } from './ResizeGroup.types'
import { debounce } from '@/utilities'

const RESIZE_DELAY = 16

// Styles for the hidden div used for measurement
const hiddenDivStyles = { position: 'fixed', visibility: 'hidden' }
const hiddenParentStyles = { position: 'relative' }

export const ResizeGroupBase = Vue.extend({
  name: 'ResizeGroupBase',

  props: {
    ...useStylingProps(),

    data: { type: Object, required: true },
    onReduceData: { type: Function, required: true },
    onGrowData: { type: Function, required: true },
    direction: { type: Number as () => ResizeGroupDirection, default: ResizeGroupDirection.horizontal },

    getItemRefs: { type: Function, default: null },
  },

  data (): any {
    return {
      dataToMeasure: this.data,
      renderedData: null,

      dataNeedsMeasuring: true,
      containerDimension: 0,
    }
  },

  computed: {
    hasRenderedContent (): boolean {
      return !!this.renderedData
    },
    isInitialMeasure (): boolean {
      return !this.hasRenderedContent && this.dataNeedsMeasuring
    },
    refToMeasure (): HTMLDivElement {
      return !this.hasRenderedContent
        ? this.$refs.initialHiddenDiv
        : this.$refs.updateHiddenDiv
    },
  },

  async mounted (): Promise<void> {
    // initial remeasure
    this.remeasure()

    // #region ResizeObserver
    const resizeObserver = new ResizeObserver(
      () => debounce(window.requestAnimationFrame(this.remeasure), RESIZE_DELAY, false),
    )
    resizeObserver.observe(this.$refs.initialHiddenDiv)
    // #endregion

    // #region IntersectionObserver
    const itemRefs = this.getItemRefs?.() ?? []
    if (!itemRefs) return
    itemRefs.forEach(itemRef => {
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) return
          observer.disconnect()
          window.requestAnimationFrame(this.remeasure)
        },
        {
          root: this.$refs.root,
          threshold: 1,
        },
      )
      observer.observe(itemRef)
    })
    // #endregion
  },

  methods: {
    measureContainer (container: HTMLElement | undefined) {
      if (!container) return 0
      const measuredBoundingRect = container.getBoundingClientRect()
      return this.direction === ResizeGroupDirection.vertical
        ? measuredBoundingRect.height
        : measuredBoundingRect.width
    },

    getElementToMeasureDimension (): number {
      return this.measureContainer(this.refToMeasure)
    },

    updateContainerDimension () {
      this.containerDimension = this.measureContainer(this.$refs.initialHiddenDiv)
    },

    async remeasure () {
      this.dataNeedsMeasuring = true
      await this.$nextTick()
      this.updateContainerDimension()
      await this.growUntilOverflow()
      this.dataNeedsMeasuring = false
    },

    async shrinkUntilFit () {
      let measuredDimension = this.getElementToMeasureDimension()
      while (measuredDimension > this.containerDimension) {
        const nextMeasuredData = this.onReduceData(this.dataToMeasure)

        if (nextMeasuredData === undefined) {
          break
        }
        this.dataToMeasure = nextMeasuredData

        await this.$nextTick()
        measuredDimension = this.getElementToMeasureDimension()
      }
      this.renderedData = this.dataToMeasure
    },

    async growUntilOverflow () {
      let measuredDimension = this.getElementToMeasureDimension()
      while (measuredDimension < this.containerDimension) {
        const nextMeasuredData = this.onGrowData(this.dataToMeasure)

        if (nextMeasuredData === undefined) {
          break
        }
        this.dataToMeasure = nextMeasuredData

        await this.$nextTick()
        measuredDimension = this.getElementToMeasureDimension()
      }

      await this.shrinkUntilFit()
    },
  },

  render (h): VNode {
    const slotProps = asSlotProps({
      root: {
        ref: 'root',
        class: this.className,
      },
      parent: {
        staticStyle: hiddenParentStyles,
      },
      hidden: {
        ref: 'updateHiddenDiv',
        staticStyle: hiddenDivStyles,
      },
      content: {
        ref: 'initialHiddenDiv',
      },
    })

    const onRenderData = (data: any) => this.$scopedSlots.default?.(data)

    return h('div', slotProps.root, [
      h('div', slotProps.parent, [
        h('div', slotProps.hidden, [
          this.dataNeedsMeasuring && !this.isInitialMeasure && onRenderData(this.dataToMeasure),
        ]),

        h('div', slotProps.content, [
          this.isInitialMeasure
            ? onRenderData(this.dataToMeasure)
            : this.renderedData && onRenderData(this.renderedData),
        ]),
      ]),
    ])
  },
})
