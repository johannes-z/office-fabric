import { IStyleFunction, IStyle } from '@uifabric/merge-styles'

import { IOverflowSetStyles, IOverflowSetStyleProps } from './OverflowSet.types'

const overflowItemStyle: IStyle = {
  flexShrink: 0,
  display: 'inherit',
}

export const getStyles: IStyleFunction<any, any> = props => {
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
