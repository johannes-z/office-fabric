import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import { asSlotProps, useStylingProps } from '@/utils/'
import { ILinkStyleProps, ILinkStyles } from './Link.types'

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>()

export const LinkBase = Vue.extend({
  name: 'LinkBase',

  functional: true,

  props: {
    ...useStylingProps(),

    as: { type: String, default: undefined },
    underline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: '' },
    target: { type: String, default: undefined },
  },

  render (h: CreateElement, ctx): VNode {
    const { styles, theme, as, target, className, href, disabled, underline } = ctx.props

    const classNames = getClassNames(styles, {
      theme,
      className,
      isButton: !href,
      isDisabled: disabled,
      isUnderlined: underline,
    })

    const rootType = as || (href ? 'a' : 'button')

    const slotProps = asSlotProps({
      root: {
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
      },
    })

    return h(rootType, slotProps.root, ctx.children)
  },
})
