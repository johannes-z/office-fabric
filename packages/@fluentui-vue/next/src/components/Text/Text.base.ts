import { classNamesFunction } from '@fluentui-vue/utilities'
import { defineComponent, h } from 'vue'
import type { ITextProps, ITextStyles } from './Text.types'
import { StylingPropKeys, asSlotProps, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<any, ITextStyles>()

export const TextBase = defineComponent({
  props: {
    ...useStylingProps(),

    as: { type: String, default: 'span' },
    nowrap: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    variant: { type: String, default: 'medium' },
  },

  setup(props, { attrs, slots }) {
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

    return () => h(RootType, slotProps.root, slots)
  },
})
