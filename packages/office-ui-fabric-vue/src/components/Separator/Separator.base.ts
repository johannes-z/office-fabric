import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ISeparatorProps } from '..'
import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>()

export const SeparatorBase = Vue.extend({
  name: 'SeparatorBase',

  functional: true,

  props: {
    ...withThemeableProps(),

    alignContent: { type: String, default: 'center' },
    vertical: { type: Boolean, default: false },
  } as MappedType<ISeparatorProps>,

  render (h, context): VNode {
    const { styles, theme, className, vertical, alignContent } = context.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      alignContent,
      vertical,
    })

    return h('div', { class: classNames.root }, [
      h('div', {
        class: classNames.content,
        attrs: {
          role: 'separator',
          'aria-orientation': vertical ? 'vertical' : 'horizontal',
        },
      }, context.children),
    ])
  },
})
