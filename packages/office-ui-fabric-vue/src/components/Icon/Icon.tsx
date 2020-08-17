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

@Component
export default class Icon extends StatelessComponent<IIconProps> {
  render (this: null, h: CreateElement, ctx: RenderContext) {
    const { className, iconName, theme, styles, imageErrorAs } = ctx.props

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!ctx.props.imageProps
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

    let imageLoadError = false
    const imageProps: IImageProps = {
      ...ctx.props.imageProps,
      onLoadingStateChange: (state: ImageLoadState): void => {
        if (ctx.props.imageProps && ctx.props.imageProps.onLoadingStateChange) {
          ctx.props.imageProps.onLoadingStateChange(state)
        }
        if (state === ImageLoadState.error) {
          imageLoadError = true
        }
      },
    }
    const ImageType = (imageLoadError && imageErrorAs) || Image

    const ariaLabel = ctx.data.attrs && (ctx.data.attrs['aria-label'] || ctx.data.attrs.ariaLabel)
    const containerProps = ariaLabel
      ? {
        'aria-label': ariaLabel,
      }
      : {
        'aria-hidden': !(ctx.props['aria-labelledby'] || imageProps['aria-labelledby']),
      }

    return (
      <RootType data-icon-name={iconName} {...{ props: containerProps }} class={classNames.root}>
        {isImage
          // @ts-ignore
          ? (<ImageType {...{ props: imageProps }} />)
          : ((ctx.scopedSlots.default && ctx.scopedSlots.default({})) || (
            typeof iconContentChildren === 'function'
              ? iconContentChildren(h)
              : iconContentChildren))
        }
      </RootType>
    )
  }
}
