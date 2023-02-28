import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types'
import { defineFunctionalComponent, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles>()

export const VerticalDividerBase = defineFunctionalComponent({
  props: {
    ...useStylingProps(),

  },

  render(props, { attrs, slots }) {
    const { styles, theme, className } = props
    const classNames = getClassNames(styles, { theme, className })

    return h('span', { class: classNames.wrapper }, [
      h('span', { class: classNames.divider }),
    ])
  },
})
