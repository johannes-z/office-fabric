<template>
  <div :class="classNames.root"
       :style="{ width: width + 'px', height: height + 'px' }">
    <img v-bind="$attrs"
         :class="classNames.image"
         :src="src"
         alt=""
         @load="onImageLoaded"
         @error="onImageError">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IImageStyleProps, IImageStyles, ImageFit, ImageCoverStyle, ImageLoadState } from './Image.types'
import BaseComponent from '../BaseComponent'
import { getStyles } from './Image.styles'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

@Component({
  inheritAttrs: false,
})
export default class Image extends BaseComponent {
  @Prop({ type: String, required: true }) src!: string
  @Prop({ type: String, default: '' }) alt!: string
  @Prop({ type: [String, Number], default: '' }) width!: string | number
  @Prop({ type: [String, Number], default: '' }) height!: string | number
  @Prop({ type: Number, default: null }) imageFit!: number
  @Prop({ type: Boolean, default: null }) maximizeFrame!: boolean
  @Prop({ type: Boolean, default: null }) shouldFadeIn!: boolean
  @Prop({ type: Boolean, default: null }) shouldStartVisible!: boolean
  @Prop({ type: Number, default: ImageCoverStyle.portrait }) coverStyle!: number

  loadState: ImageLoadState = ImageLoadState.notLoaded

  private static svgRegex = /\.svg$/i;

  get classNames () {
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
      isNotImageFit: imageFit === undefined,
    })
  }

  private onImageLoaded () {
    this.loadState = ImageLoadState.loaded
  }
  private onImageError () {
    this.loadState = ImageLoadState.error
  }
}
</script>
