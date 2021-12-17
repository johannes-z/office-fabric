import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ITextProps } from '..'
import { ITextStyles } from './Text.types'

const getClassNames = classNamesFunction<any, ITextStyles>()

export default Vue.extend({
  name: 'TextBase',

  functional: true,

  props: {
    ...withThemeableProps(),

    as: { type: String, default: 'span' },
    nowrap: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    variant: { type: String, default: 'medium' },
  } as MappedType<ITextProps>,

  render (h, ctx): VNode {
    const { as: RootType, theme, styles, block, nowrap, variant } = ctx.props
    const classNames = getClassNames(styles, {
      theme,
      block,
      nowrap,
      variant,
    })

    return h(RootType, {
      ...ctx.data,
      on: ctx.listeners,
      class: classNames.root,
    }, ctx.children)
  },
})
