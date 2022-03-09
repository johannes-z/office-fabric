
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import Vue, { CreateElement, VNode } from 'vue'
import { IOverlayStyleProps, IOverlayStyles } from './Overlay.types'

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>()

export const OverlayBase = Vue.extend({
  props: {
    ...withThemeableProps(),
    dark: { type: Boolean, default: false },
  },

  computed: {
    classNames (): IProcessedStyleSet<IOverlayStyles> {
      const { theme, className, dark: isDark } = this
      return getClassNames(this.styles, {
        theme,
        className,
        isDark,
      })
    },
  },

  render (h: CreateElement): VNode {
    const { classNames } = this
    return h('div', { class: classNames.root }, this.$slots.default)
  },
})
