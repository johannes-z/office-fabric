import { HighContrastSelector, mergeStyleSets } from '@fluentui-vue/style-utilities'
import type { Point } from '@fluentui-vue/utilities'
import type { IStyleFunction } from '@fluentui/merge-styles'
import type { ICalloutContentStyleProps, ICalloutContentStyles } from '..'
import type { IKeytipStyleProps, IKeytipStyles } from '.'

export function getStyles(props: IKeytipStyleProps): IKeytipStyles {
  const { theme, disabled, visible } = props
  return {
    container: [
      {
        backgroundColor: theme.palette.neutralDark,
      },
      disabled && {
        opacity: 0.5,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            opacity: 1,
          },
        },
      },
      !visible && {
        visibility: 'hidden',
      },
    ],
    root: [
      theme.fonts.medium,
      {
        textAlign: 'center',
        paddingLeft: '3px',
        paddingRight: '3px',
        backgroundColor: theme.palette.neutralDark,
        color: theme.palette.neutralLight,
        minWidth: '11px',
        lineHeight: '17px',
        height: '17px',
        display: 'inline-block',
      },
      disabled && {
        color: theme.palette.neutralTertiaryAlt,
      },
    ],
  }
}

export function getCalloutStyles(props: ICalloutContentStyleProps): ICalloutContentStyles {
  return {
    container: [],
    root: [
      {
        border: 'none',
        boxShadow: 'none',
      },
    ],
    beak: [],
    beakCurtain: [],
    calloutMain: [
      {
        backgroundColor: 'transparent',
      },
    ],
  }
}

export function getCalloutOffsetStyles(offset: Point): IStyleFunction<ICalloutContentStyleProps, ICalloutContentStyles> {
  return (props: ICalloutContentStyleProps): ICalloutContentStyles => {
    return mergeStyleSets(getCalloutStyles(props), {
      root: [
        {
          // eslint-disable-next-line deprecation/deprecation
          marginLeft: offset.left || offset.x,
          // eslint-disable-next-line deprecation/deprecation
          marginTop: offset.top || offset.y,
        },
      ],
    })
  }
}
