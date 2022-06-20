import Vue, { PropType, VNode } from 'vue'
import { asSlotProps, useStylingProps } from '@/utils'
import { ResizeGroupDirection } from './ResizeGroup.types'
import { debounce } from '@fluentui-vue/utilities'

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
      resizeObserver: null,
    }
  },

  beforeDestroy () {
    this.resizeObserver.disconnect()
  },

  async mounted (): Promise<void> {
    // initial remeasure
    this.remeasure()

    // #region ResizeObserver
    this.resizeObserver = new ResizeObserver(
      () => debounce(window.requestAnimationFrame(this.remeasure), RESIZE_DELAY, false),
    )
    this.resizeObserver.observe(this.$refs.initialHiddenDiv)
    // #endregion
  },

  methods: {
    measureContainer (container: HTMLElement | undefined) {
      if (!container) return 0
      const measuredBoundingRect = container.getBoundingClientRect()
      return this.direction === ResizeGroupDirection.vertical
        ? Math.round(measuredBoundingRect.height)
        : Math.round(measuredBoundingRect.width)
    },

    getElementToMeasureDimension (): number {
      return this.$refs.root.scrollWidth // this.measureContainer(this.refToMeasure)
    },

    updateContainerDimension () {
      this.containerDimension = this.measureContainer(this.$refs.initialHiddenDiv)
    },

    async remeasure () {
      await this.$nextTick()
      this.updateContainerDimension()
      await this.growUntilOverflow()
    },

    async shrinkUntilFit () {
      let measuredDimension = this.getElementToMeasureDimension()
      while (measuredDimension > this.containerDimension) {
        const result = this.onReduceData(this.data)

        if (!result) break

        await this.$nextTick()
        measuredDimension = this.getElementToMeasureDimension()
      }
    },

    async growUntilOverflow () {
      let measuredDimension = this.getElementToMeasureDimension()
      while (measuredDimension <= this.containerDimension) {
        const result = this.onGrowData(this.data)

        if (!result) break

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
        h('div', slotProps.content, [
          onRenderData(this.data),
        ]),
      ]),
    ])
  },
})
