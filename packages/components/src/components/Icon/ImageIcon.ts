import { h } from 'vue'
import { css } from '@fluentui-vue/utilities'
import { Image } from '../Image/Image'
import { MS_ICON, classNames } from './Icon.styles'

export function ImageIcon(props, { attrs }) {
  console.log(props)
  const { className, imageProps = {} } = props

  const altText = imageProps.alt || props['aria-label']
  const hasName
    = altText
    || props['aria-labelledby']
    || props.title
    || imageProps['aria-label']
    || imageProps['aria-labelledby']
    || imageProps.title

  const imageNameProps = {
    'aria-labelledby': props['aria-labelledby'],
    'aria-describedby': props['aria-describedby'],
    title: props.title,
  }
  const containerProps = hasName
    ? {}
    : {
        'aria-hidden': true,
      }

  return h('div', {
    ...containerProps,
    ...props,
    class: css(MS_ICON, classNames.root, classNames.image, className),
  }, h(Image, {
    ...imageNameProps,
    ...imageProps,
    alt: hasName ? altText : '',
  }))
}

ImageIcon.props = ['className', 'imageProps', 'title', 'aria-label', 'aria-labelledby', 'aria-describedby']
