import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IShimmerProps, IShimmerStyles } from './Shimmer.types'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<any, IShimmerStyles>()

const TRANSITION_ANIMATION_INTERVAL = 200 /* ms */

@Component({
  components: { ShimmerElementsGroup },
})
export class ShimmerBase extends BaseComponent {
  @Prop({ default: null }) shimmerColors!: any
  @Prop({ type: Boolean, default: false }) isDataLoaded!: boolean
  @Prop({ type: Array, default: undefined }) shimmerElements!: any[]
  @Prop({ type: [Number, String], default: null }) width!: number | string

  lastTimeoutId!: number
  contentLoaded: boolean = this.isDataLoaded

  get classNames () {
    const { theme, styles, className, shimmerColors } = this
    return getClassNames(styles, {
      theme: theme!,
      isDataLoaded: false,
      className,
      transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL,
      shimmerColor: shimmerColors && shimmerColors.shimmer,
      shimmerWaveColor: shimmerColors && shimmerColors.shimmerWave,
    })
  }

  beforeDestroy () {
    this._async.dispose()
  }

  @Watch('isDataLoaded')
  componentDidUpdate (newVal: boolean, oldVal: boolean) {
    if (newVal === oldVal) return

    if (this.isDataLoaded) {
      this.lastTimeoutId = this._async.setTimeout(() => {
        this.contentLoaded = this.isDataLoaded
      }, TRANSITION_ANIMATION_INTERVAL)
    } else {
      this.contentLoaded = this.isDataLoaded
    }
  }

  render (h: CreateElement) {
    const { classNames, width, shimmerElements, shimmerColors } = this

    return h('div', {
      class: classNames.root,
    }, [
      h('div', {
        style: { width: width || '100%' },
        class: classNames.shimmerWrapper,
      }, [
        h('div', { class: classNames.shimmerGradient }),
        h(ShimmerElementsGroup, {
          attrs: {
            shimmerElements,
            backgroundColor: shimmerColors && shimmerColors.background,
          },
        }),
      ]),
    ])
  }
}
