
import { asSlotProps, useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import { IOverlayStyleProps, IOverlayStyles } from './Overlay.types'

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>()

export const OverlayBase = Vue.extend({
  name: 'OverlayBase',

  functional: true,

  props: {
    ...useStylingProps(),
    dark: { type: Boolean, default: false },
  },

  render (h: CreateElement, ctx): VNode {
    const { theme, styles, className, dark: isDark } = ctx.props

    const classNames = getClassNames(styles, {
      theme,
      className,
      isDark,
    })

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        class: classNames.root,
      },
    })

    return h('div', slotProps.root, ctx.children)
  },
})
