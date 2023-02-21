import Vue, { CreateElement, RenderContext, VNode, h } from 'vue'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { getTheme } from '@fluentui-vue/style-utilities'
import { styles } from './Stack.styles'
import { useStylingProps } from '@/utils/'

const getClassNames = classNamesFunction()

export const Stack = (props, { attrs, slots }) => {
  const { theme = getTheme(), tokens, verticalFill, horizontal, reversed, grow, wrap, horizontalAlign, verticalAlign, disableShrink, className } = props

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
}

Stack.props = Object.keys({
  ...useStylingProps(),

  verticalFill: { type: String, default: '' },
  horizontal: { type: Boolean, default: false },
  reversed: { type: Boolean, default: false },
  childrenGap: { type: Number, default: 0 },
  grow: { type: Boolean, default: false },
  wrap: { type: Boolean, default: false },
  horizontalAlign: { type: String, default: '' },
  verticalAlign: { type: String, default: '' },
  disableShrink: { type: Boolean, default: false },

  tokens: { type: Object, default: () => {} },
})
