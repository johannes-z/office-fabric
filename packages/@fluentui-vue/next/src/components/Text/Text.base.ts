import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ITextProps, ITextStyles } from './Text.types'
import { StylingPropKeys, asSlotProps } from '@/utils'

const getClassNames = classNamesFunction<any, ITextStyles>()

export const TextBase = (props: ITextProps, { attrs, slots }) => {
  const { styles, theme, as: RootType = 'span', block, nowrap, variant = 'medium' } = props

  const classNames = getClassNames(styles, {
    theme,
    block: block != null && block !== false,
    nowrap: nowrap != null && nowrap !== false,
    variant,
  })

  const slotProps = asSlotProps({
    root: {
      ...attrs,
      class: classNames.root,
    },
  })

  return h(RootType, slotProps.root, slots)
}
TextBase.props = [...StylingPropKeys, 'as', 'nowrap', 'block', 'variant']
