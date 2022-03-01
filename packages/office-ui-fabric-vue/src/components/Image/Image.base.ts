import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { IImageStyleProps, IImageStyles, ImageCoverStyle, ImageFit, ImageLoadState } from './Image.types'

const getClassNames = classNamesFunction<IImageStyleProps, IImageStyles>()

const SVG_REGEX = /\.svg$/i
const KEY_PREFIX = 'fabricImage'

export const ImageBase = Vue.extend({
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: [String, Number], default: '' },
    height: { type: [String, Number], default: '' },
    imageFit: { type: Number, default: null },
    maximizeFrame: { type: Boolean, default: null },
    shouldFadeIn: { type: Boolean, default: true },
    shouldStartVisible: { type: Boolean, default: null },
    coverStyle: { type: Number, default: ImageCoverStyle.portrait },

    ...withThemeableProps(),
  },

  data () {
    return {
      loadState: ImageLoadState.notLoaded,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<IImageStyles> {
      const { styles, loadState, coverStyle, imageFit, theme, className, width, height, maximizeFrame, shouldFadeIn, shouldStartVisible } = this

      return getClassNames(styles, {
        theme,
        className,
        width,
        height,
        maximizeFrame,
        shouldFadeIn,
        shouldStartVisible,
        isLoaded: loadState === ImageLoadState.loaded || (loadState === ImageLoadState.notLoaded && shouldStartVisible),
        isLandscape: coverStyle === ImageCoverStyle.landscape,
        isCenter: imageFit === ImageFit.center,
        isCenterContain: imageFit === ImageFit.centerContain,
        isCenterCover: imageFit === ImageFit.centerCover,
        isContain: imageFit === ImageFit.contain,
        isCover: imageFit === ImageFit.cover,
        isNone: imageFit === ImageFit.none,
        isError: loadState === ImageLoadState.error,
        isNotImageFit: imageFit == null,
      })
    },
  },

  methods: {
    onImageLoaded () {
      this.loadState = ImageLoadState.loaded
    },
    onImageError () {
      this.loadState = ImageLoadState.error
    },
  },

  render (h: CreateElement): VNode {
    const { classNames, src, alt, width, height } = this

    const $image = h('img', {
      attrs: {
        ...this.$attrs,
        src,
        alt,
      },
      class: classNames.image,
      on: {
        load: this.onImageLoaded,
        error: this.onImageError,
      },
    })
    return h('div', {
      class: classNames.root,
      style: { width: width + 'px', height: height + 'px' },
    }, [
      $image,
    ])
  },

})
