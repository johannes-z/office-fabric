import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode, h } from 'vue'
import { asSlotProps } from '../../utils/types'
import type { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'
import { useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>()

export const SeparatorBase = (props, { attrs, slots }) => {
  const { styles, theme, className, vertical: _vertical, alignContent } = props

  const vertical = _vertical != null && _vertical !== false

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    alignContent,
    vertical,
  })

  const slotProps = asSlotProps<ISeparatorStyles>({
    root: {
      ...attrs,
      class: classNames.root,
    },
    content: {
      'class': classNames.content,
      'role': 'separator',
      'aria-orientation': vertical ? 'vertical' : 'horizontal',
    },
  })

  return h('div', slotProps.root, [
    h('div', slotProps.content, slots),
  ])
}

SeparatorBase.props = Object.keys({
  ...useStylingProps(),

  alignContent: {
    type: String as () => ISeparatorProps['alignContent'],
    default: 'center' as const,
  },
  vertical: { type: Boolean, default: false },
})
