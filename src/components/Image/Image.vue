<template>
  <div v-bind="css.root">
    <img v-bind="[$attrs, css.image]"
         :src="src"
         alt="">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IImageStyleProps, IImageStyles, ImageFit, ImageCoverStyle } from './Image.types'
import BaseComponent from '../BaseComponent'

const ImageFitStyles: any = {
  position: 'absolute',
  left: '50% /* @noflip */',
  top: '50%',
  transform: 'translate(-50%,-50%)',
}

@Component({
  inheritAttrs: false,
})
export default class Image extends BaseComponent<IImageStyleProps, IImageStyles> {
  @Prop({ required: true }) src!: string
  @Prop({ default: '' }) alt!: string
  @Prop({ default: '' }) width!: string
  @Prop({ default: '' }) height!: string
  @Prop({ default: null }) imageFit!: number
  @Prop({ default: ImageCoverStyle.portrait }) coverStyle!: number

  private static svgRegex = /\.svg$/i;

  get baseStyles (): IImageStyles {
    const { coverStyle, imageFit, width, height } = this
    const isLandscape = coverStyle === ImageCoverStyle.landscape
    const isCenter = imageFit === ImageFit.center
    const isCenterContain = imageFit === ImageFit.centerContain
    const isCenterCover = imageFit === ImageFit.centerCover
    const isContain = imageFit === ImageFit.contain
    const isCover = imageFit === ImageFit.cover
    const isNone = imageFit === ImageFit.none

    const supportsObjectFit: boolean = window !== undefined && window.navigator.msMaxTouchPoints === undefined
    const fallbackObjectFitStyles =
  (isContain && isLandscape) || (isCover && !isLandscape) ? { width: '100%', height: 'auto' } : { width: 'auto', height: '100%' }

    return {
      root: [
        'ms-Image',
        this.$style.root,
        (isCenter || isContain || isCover || isCenterContain || isCenterCover) && {
          position: 'relative',
        },
        {
          width: width && `${width}${isNaN(parseInt(width[width.length - 1])) ? '' : 'px'}`,
          height: height && `${height}${isNaN(parseInt(height[height.length - 1])) ? '' : 'px'}`,
        },
      ],
      image: [
        'ms-Image-image',
        this.$style.image,
        isCenter && [ImageFitStyles],
        isContain && [
          supportsObjectFit && {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          },
          !supportsObjectFit && fallbackObjectFitStyles,
          ImageFitStyles,
        ],
        isNone && [
          // classNames.imageNone,
          {
            width: 'auto',
            height: 'auto',
          },
        ],
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
  overflow: hidden;
}
.image {
  display: block;
  opacity: 1;
}
</style>
