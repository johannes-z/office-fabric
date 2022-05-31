import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import { asSlotProps, useStylingProps } from '@/utils'
import { ITextStyles } from './Text.types'

const getClassNames = classNamesFunction<any, ITextStyles>()

export const TextBase = Vue.extend({
  name: 'TextBase',

  functional: true,

  props: {
    ...useStylingProps(),

    as: { type: String, default: 'span' },
    nowrap: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    variant: { type: String, default: 'medium' },
  },

  render (h: CreateElement, ctx): VNode {
    const { styles, theme, as: RootType, block, nowrap, variant } = ctx.props

    const classNames = getClassNames(styles, {
      theme,
      block,
      nowrap,
      variant,
    })

    const slotProps = asSlotProps({
      root: {
        ...ctx.data,
        class: classNames.root,
      },
    })

    return h(RootType, slotProps.root, ctx.children)
  },
})
