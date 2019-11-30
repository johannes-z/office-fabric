import { ILayerStyles } from './Layer.types'
import { getGlobalClassNames, ZIndexes } from '@/styling'

const GlobalClassNames = {
  root: 'ms-Layer',
  rootNoHost: 'ms-Layer--fixed',
  content: 'ms-Layer-content',
}

export const getStyles = (props: any): ILayerStyles => {
  const { className, isNotHost, theme } = props

  const classNames = getGlobalClassNames(GlobalClassNames, theme)

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      isNotHost && [
        classNames.rootNoHost,
        {
          position: 'fixed',
          zIndex: ZIndexes.Layer,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          visibility: 'hidden',
        },
      ],
      className,
    ],
    content: [
      classNames.content,
      {
        visibility: 'visible',
      },
    ],
  }
}
