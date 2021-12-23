import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { IVerticalDividerProps, IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types'

const getClassNames = classNamesFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles>()

export const VerticalDividerBase = Vue.extend({
  name: 'VerticalDividerBase',

  functional: true,

  props: {
    ...withThemeableProps(),
  } as MappedType<IVerticalDividerProps>,

  render (h, ctx): VNode {
    const { styles, theme, className } = ctx.props
    const classNames = getClassNames(styles, { theme, className })

    return h('span', { class: classNames.wrapper }, [
      h('span', { class: classNames.divider }),
    ])
  },
})
