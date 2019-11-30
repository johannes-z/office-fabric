<template>
  <div :class="classNames.root">
    <img v-bind="$attrs"
         :class="classNames.image"
         :src="src"
         alt="">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IImageStyleProps, IImageStyles, ImageFit, ImageCoverStyle } from './Image.types'
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

  private static svgRegex = /\.svg$/i;

  get classNames () {
    const { coverStyle, imageFit, theme, className, width, height, maximizeFrame, shouldFadeIn, shouldStartVisible } = this
    return getClassNames(getStyles, {
      theme,
      className,
      width,
      height,
      maximizeFrame,
      shouldFadeIn,
      shouldStartVisible,
      isLoaded: true, // loadState === ImageLoadState.loaded || (loadState === ImageLoadState.notLoaded && this.props.shouldStartVisible),
      isLandscape: coverStyle === ImageCoverStyle.landscape,
      isCenter: imageFit === ImageFit.center,
      isCenterContain: imageFit === ImageFit.centerContain,
      isCenterCover: imageFit === ImageFit.centerCover,
      isContain: imageFit === ImageFit.contain,
      isCover: imageFit === ImageFit.cover,
      isNone: imageFit === ImageFit.none,
      isError: false, // loadState === ImageLoadState.error,
      isNotImageFit: imageFit === undefined,
    })
  }
}
</script>
