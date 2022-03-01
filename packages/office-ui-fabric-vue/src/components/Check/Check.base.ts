import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { CreateElement, RenderContext, VNode } from 'vue'
import { FontIcon, Icon } from '../Icon'
import { ICheckStyleProps, ICheckStyles } from './Check.types'

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>()

export const CheckBase = Vue.extend({
  name: 'CheckBase',

  props: {
    ...withThemeableProps(),
    checked: { type: Boolean, default: false },
    useFastIcons: { type: Boolean, default: true },
  },

  render (h: CreateElement, ctx: RenderContext): VNode {
    const { checked, className, theme, styles, useFastIcons } = ctx.props

    const classNames = getClassNames(styles!, { theme, className, checked })
    const IconComponent = useFastIcons ? FontIcon : Icon

    return h('div', { class: classNames.root }, [
      h(IconComponent, { class: classNames.circle, props: { iconName: 'CircleRating' } }),
      h(IconComponent, { class: classNames.check, props: { iconName: 'StatusCircleCheckmark' } }),
    ])
  },
})
