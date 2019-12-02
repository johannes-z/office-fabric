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
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Image.styles'

@Component({
  inheritAttrs: false,
})
export default class Image extends BaseComponent<IImageStyleProps, IImageStyles> {
  @Prop({ required: true }) src!: string
  @Prop({ default: '' }) alt!: string
  @Prop({ default: '' }) width!: string
  @Prop({ default: '' }) height!: string
  @Prop({ default: null }) imageFit!: number
  @Prop({ default: null }) maximizeFrame!: boolean
  @Prop({ default: null }) shouldFadeIn!: boolean
  @Prop({ default: null }) shouldStartVisible!: boolean
  @Prop({ default: ImageCoverStyle.portrait }) coverStyle!: number

  loadState: ImageLoadState = ImageLoadState.notLoaded

  private static svgRegex = /\.svg$/i;

  get classNames () {
    const { loadState, coverStyle, imageFit, theme, className, width, height, maximizeFrame, shouldFadeIn, shouldStartVisible } = this
    return getClassNames(getStyles, {
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
