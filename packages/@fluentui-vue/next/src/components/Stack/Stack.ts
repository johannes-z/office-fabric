import Vue, { VNode, CreateElement, RenderContext } from 'vue'
import { styles } from './Stack.styles'
import { useStylingProps } from '@/utils/'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'

const getClassNames = classNamesFunction()

export const Stack = Vue.extend({
  functional: true,

  props: {
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
  },

  render (h: CreateElement, ctx: RenderContext): VNode {
    const { theme, tokens, verticalFill, horizontal, reversed, grow, wrap, horizontalAlign, verticalAlign, disableShrink, className } = ctx.props

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
    }, theme, tokens), ctx.props.styles))

    return h('div', {
      ...ctx.data,
      class: classNames.root,
    }, ctx.children)
  },
})
