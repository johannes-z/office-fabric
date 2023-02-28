import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import { asSlotProps } from '../../utils/types'
import type { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types'
import { defineFunctionalComponent, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>()

export const SeparatorBase = defineFunctionalComponent({
  name: 'SeparatorBase',

  props: {
    ...useStylingProps(),

    alignContent: {
      type: String as () => ISeparatorProps['alignContent'],
      default: 'center' as const,
    },
    vertical: { type: Boolean, default: false },
  },

  render(props, { attrs, slots }) {
    const { styles, theme, className, vertical: _vertical, alignContent } = props
    console.log(theme)

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
  },
})
