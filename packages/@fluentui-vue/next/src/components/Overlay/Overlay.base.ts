import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { IOverlayStyleProps, IOverlayStyles } from './Overlay.types'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>()

export const OverlayBase = defineFunctionalComponent({
  name: 'OverlayBase',

  props: {
    ...useStylingProps(),
    dark: { type: Boolean, default: false },
    isDarkThemed: { type: Boolean, default: false },
  },

  render(props, { attrs, slots }) {
    const { theme, styles, className, dark, isDarkThemed } = props

    const classNames = getClassNames(styles, {
      theme,
      className,
      isDark: dark || isDarkThemed,
    })

    const slotProps = asSlotProps({
      root: {
        ...attrs,
        class: classNames.root,
      },
    })

    return h('div', slotProps.root, slots)
  },
})
