import { classNamesFunction } from '@fluentui-vue/utilities'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { IImageStyleProps, IImageStyles } from './Image.types'
import { ImageCoverStyle, ImageFit, ImageLoadState } from './Image.types'
import { makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IImageStyleProps, IImageStyles>()

const SVG_REGEX = /\.svg$/i
const KEY_PREFIX = 'fabricImage'

export const ImageBase = defineComponent({
  props: {
    ...makeStylingProps(),

    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: [String, Number], default: '' },
    height: { type: [String, Number], default: '' },
    imageFit: { type: Number, default: null },
    maximizeFrame: { type: Boolean, default: null },
    shouldFadeIn: { type: Boolean, default: true },
    shouldStartVisible: { type: Boolean, default: null },
    coverStyle: { type: Number, default: ImageCoverStyle.portrait },
  },

  setup(props, { attrs, slots }) {
    const { styles, coverStyle, imageFit, theme, className, width, height, maximizeFrame, shouldFadeIn, shouldStartVisible, src, alt } = toRefs(props)

    const loadState = ref(ImageLoadState.notLoaded)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value!,
      className: className.value,
      width: width.value,
      height: height.value,
      maximizeFrame: maximizeFrame.value,
      shouldFadeIn: shouldFadeIn.value,
      shouldStartVisible: shouldStartVisible.value,
      isLoaded: loadState.value === ImageLoadState.loaded || (loadState.value === ImageLoadState.notLoaded && shouldStartVisible.value),
      isLandscape: coverStyle.value === ImageCoverStyle.landscape,
      isCenter: imageFit.value === ImageFit.center,
      isCenterContain: imageFit.value === ImageFit.centerContain,
      isCenterCover: imageFit.value === ImageFit.centerCover,
      isContain: imageFit.value === ImageFit.contain,
      isCover: imageFit.value === ImageFit.cover,
      isNone: imageFit.value === ImageFit.none,
      isError: loadState.value === ImageLoadState.error,
      isNotImageFit: imageFit.value == null,
    }))

    return () => h('div', {
      class: classNames.value.root,
      style: { width: `${width.value}px`, height: `${height.value}px` },
    }, [
      h('img', {
        ...attrs,
        src: src.value,
        alt: alt.value,
        class: classNames.value.image,
        onLoad: () => {
          loadState.value = ImageLoadState.loaded
        },
        onError: () => {
          loadState.value = ImageLoadState.error
        },
      }),
    ])
  },
})
