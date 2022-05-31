import { useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import type { SlotProps } from '../../utils/types'
import type { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>()

export const SeparatorBase = Vue.extend({
  name: 'SeparatorBase',

  functional: true,

  props: {
    ...useStylingProps(),

    alignContent: {
      type: String as () => ISeparatorProps['alignContent'],
      default: 'center' as const,
    },
    vertical: { type: Boolean, default: false },
  },

  render (h: CreateElement, ctx): VNode {
    const { styles, theme, className, vertical, alignContent } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      alignContent,
      vertical,
    })

    const slotProps: SlotProps<ISeparatorStyles> = {
      root: {
        ...ctx.data,
        class: classNames.root,
      },
      content: {
        class: classNames.content,
        attrs: {
          role: 'separator',
          'aria-orientation': vertical ? 'vertical' : 'horizontal',
        },
      },
    }

    return h('div', slotProps.root, [
      h('div', slotProps.content, ctx.children),
    ])
  },
})
