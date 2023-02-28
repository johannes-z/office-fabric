import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types'
import { asSlotProps, defineFunctionalComponent, useStylingProps } from '@/utils/'

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>()

export const LinkBase = defineFunctionalComponent({
  props: {
    ...useStylingProps(),

    as: { type: String, default: undefined },
    underline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: '' },
    target: { type: String, default: undefined },
  },

  render(props: ILinkProps, { attrs, slots }) {
    const { styles, theme, as, target, className, href, disabled, underline } = props

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      isButton: !href,
      isDisabled: disabled,
      isUnderlined: underline,
    })

    const rootType = as || (href ? 'a' : 'button')

    const slotProps = asSlotProps({
      root: {
        ...attrs,
        class: classNames.root,
        ...rootType === 'a' && {
          target,
          href: disabled ? undefined : href,
        },
        ...rootType === 'button' && {
          type: 'button',
          disabled,
        },
      },
    })

    return h(rootType, slotProps.root, slots)
  },
})
