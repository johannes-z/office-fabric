import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ILabelProps } from '..'
import { ILabelStyleProps, ILabelStyles } from './Label.types'

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>({
  // Label is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Label.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

export const LabelBase = Vue.extend({
  name: 'LabelBase',

  functional: true,

  props: {
    ...withThemeableProps(),

    as: { type: String, default: 'label' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  } as MappedType<ILabelProps>,

  render (h, ctx): VNode {
    const { as: RootType, theme, className, styles, disabled, required } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      disabled,
      required,
    })

    return h(RootType, {
      ...ctx.data,
      on: ctx.listeners,
      class: classNames.root,
    }, ctx.children)
  },
})
