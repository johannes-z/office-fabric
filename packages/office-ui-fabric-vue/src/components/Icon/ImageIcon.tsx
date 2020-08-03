import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { css } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

import { IIconProps } from './Icon.types'
import { MS_ICON, classNames } from './Icon.styles'
import { Image } from '../Image'

@Component
export class ImageIcon extends StatelessComponent<IIconProps> {
  @Prop({ type: Object, default: null }) imageProps!: any

  render (h: CreateElement, context: RenderContext) {
    const { imageProps } = context.props
    const className = [context.props.className, context.data.class].filter(e => e).join(' ')

    const containerProps = (context.data.attrs && context.data.attrs['aria-label'])
      ? {}
      : {
        role: 'presentation',
        'aria-hidden': !(imageProps.alt || imageProps['aria-labelledby']),
      }

    return (
      <div {...{ props: containerProps }} class={css(MS_ICON, classNames.root, classNames.image, className)}>
        <Image { ...{ props: imageProps }} />
      </div>
    )
  }
}
