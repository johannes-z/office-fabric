import { memoizeFunction } from '@fluentui-vue/utilities'
import { mergeStyles } from '@fluentui/merge-styles'

export interface IDraggableZoneStyles {
  root: string
}

export const getClassNames = memoizeFunction((className: string, isDragging: boolean): IDraggableZoneStyles => {
  return {
    root: mergeStyles(
      className,
      isDragging && {
        touchAction: 'none',
        selectors: {
          '& *': {
            userSelect: 'none',
          },
        },
      },
    ),
  }
})
