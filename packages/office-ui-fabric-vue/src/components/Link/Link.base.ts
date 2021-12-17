import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode } from 'vue'
import { ILinkProps } from '..'
import { ILinkStyleProps, ILinkStyles } from './Link.types'

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>()

export const LinkBase = Vue.extend({
  name: 'LinkBase',

  functional: true,

  props: {
    ...withThemeableProps(),

    as: { type: String, default: undefined },
    underline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: '' },
    target: { type: String, default: undefined },
  } as MappedType<ILinkProps>,

  render (h, ctx): VNode {
    const { as, target, theme, className, styles, href, disabled, underline } = ctx.props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      isButton: !href,
      isDisabled: disabled,
      isUnderlined: underline,
    })

    const rootType = as || (href ? 'a' : 'button')
    return h(rootType, {
      ...ctx.data,
      class: classNames.root,
      attrs: {
        ...rootType === 'a' && {
          target,
          href: disabled ? undefined : href,
        },
        ...rootType === 'button' && {
          type: 'button',
          disabled,
        },
        ...ctx.data.attrs,
      },
    }, ctx.children)
  },
})
