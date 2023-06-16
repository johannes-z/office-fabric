import { getTheme } from '@fluentui-vue/style-utilities'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { h } from 'vue'
import { styles } from './Stack.styles'
import { defineFunctionalComponent, useBooleanProp, makeStylingProps } from '@/utils/'

const getClassNames = classNamesFunction()

export const Stack = defineFunctionalComponent({
  props: {
    ...makeStylingProps(),

    verticalFill: { type: String, default: '' },
    horizontal: { type: Boolean, default: false },
    reversed: { type: Boolean, default: false },
    childrenGap: { type: Number, default: 0 },
    grow: { type: Boolean, default: false },
    wrap: { type: Boolean, default: false },
    horizontalAlign: { type: String, default: '' },
    verticalAlign: { type: String, default: '' },
    disableShrink: { type: Boolean, default: false },

    tokens: { type: Object, default: () => ({}) },
  },

  render(props, { attrs, slots }) {
    const { theme = getTheme(), tokens, verticalFill, horizontalAlign, verticalAlign, className, horizontal, reversed, grow, wrap, disableShrink } = props

    const classNames: any = getClassNames(mergeStyleSets(styles({
      className,
      verticalFill,
      horizontal,
      reversed,
      grow,
      wrap,
      horizontalAlign,
      verticalAlign,
      disableShrink,
    }, theme, tokens), props.styles))

    return h('div', {
      ...attrs,
      class: classNames.root,
    }, slots)
  },
})
