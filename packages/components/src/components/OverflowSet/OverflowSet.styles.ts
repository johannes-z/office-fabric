import type { IStyle, IStyleFunction } from '@fluentui/merge-styles'
import type { IOverflowSetStyleProps, IOverflowSetStyles } from './OverflowSet.types'

const overflowItemStyle: IStyle = {
  flexShrink: 0,
  display: 'inherit',
}

export const getStyles: IStyleFunction<IOverflowSetStyleProps, IOverflowSetStyles> = (props) => {
  const { className, vertical } = props
  return {
    root: [
      'ms-OverflowSet',
      {
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap',
      },
      vertical && { flexDirection: 'column' },
      className,
    ],
    item: ['ms-OverflowSet-item', overflowItemStyle],
    overflowButton: ['ms-OverflowSet-overflowButton', overflowItemStyle],
  }
}
