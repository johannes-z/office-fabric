import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

import { getIconContent } from './FontIcon'
import { IIconProps } from './Icon.types'
import BaseComponent from '../BaseComponent'
import { ImageLoadState, IImageProps } from '../Image'

const getClassNames = classNamesFunction({
  // Icon is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Icon.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

type IconContentChildren = string | undefined | ((h: CreateElement) => JSX.Element)

@Component
export default class Icon extends BaseComponent<IIconProps> {
  @Prop({ type: String, default: '' }) iconName!: string
  @Prop({ type: Object, default: null }) imageProps!: any
  @Prop({ type: String, default: '' }) imageErrorAs!: string

  imageLoadError = false

  render (h: CreateElement) {
    const { className, iconName, theme, styles, imageErrorAs, imageLoadError } = this

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!this.imageProps
    const iconContent = getIconContent(iconName) || {}
    const { iconClassName } = iconContent
    const iconContentChildren = iconContent.children as any

    const classNames: any = getClassNames(styles, {
      theme,
      className,
      iconClassName,
      isImage,
      isPlaceholder,
    })

    const RootType = isImage ? 'span' : 'i'

    const imageProps: IImageProps = {
      ...this.imageProps,
      onLoadingStateChange: this._onImageLoadingStateChange,
    }
    const ImageType = (imageLoadError && imageErrorAs) || Image

    const ariaLabel = this.$attrs['aria-label'] || this.$attrs.ariaLabel
    const containerProps = ariaLabel
      ? {
        'aria-label': ariaLabel,
      }
      : {
        'aria-hidden': !(this.props['aria-labelledby'] || imageProps['aria-labelledby']),
      }

    return (
      <RootType data-icon-name={iconName} {...{ props: containerProps }} class={classNames.root}>
        {isImage
          ? (<ImageType {...{ props: imageProps }} />)
          : ((this.$scopedSlots.default && this.$scopedSlots.default({})) || (
            typeof iconContentChildren === 'function'
              ? iconContentChildren(h)
              : iconContentChildren))
        }
      </RootType>
    )
  }

  private _onImageLoadingStateChange = (state: ImageLoadState): void => {
    if (this.imageProps && this.imageProps.onLoadingStateChange) {
      this.imageProps.onLoadingStateChange(state)
    }
    if (state === ImageLoadState.error) {
      this.imageLoadError = true
    }
  };
}
