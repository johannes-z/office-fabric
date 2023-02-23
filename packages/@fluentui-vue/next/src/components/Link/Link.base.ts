import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types'
import { StylingPropKeys, asSlotProps } from '@/utils/'

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>()

export const LinkBase = (props: ILinkProps, { attrs, slots }) => {
  const { styles, theme, as, target, className, href, disabled, underline } = props

  const isDisabled = disabled != null && disabled !== false

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    isButton: !href,
    isDisabled: isDisabled,
    isUnderlined: underline,
  })

  const rootType = as || (href ? 'a' : 'button')

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      class: classNames.root,
      ...rootType === 'a' && {
        target,
        href: isDisabled ? undefined : href,
      },
      ...rootType === 'button' && {
        type: 'button',
        isDisabled,
      },
    },
  })

  return h(rootType, slotProps.root, slots)
}

LinkBase.props = [...StylingPropKeys, 'as', 'underline', 'disabled', 'href', 'target']
