import { asSlotProps, useStylingProps } from '@/utils/'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import { ILabelStyleProps, ILabelStyles } from './Label.types'

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>()

export const LabelBase = Vue.extend({
  name: 'LabelBase',

  functional: true,

  props: {
    ...useStylingProps(),

    as: { type: String, default: 'label' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  render (h: CreateElement, ctx): VNode {
    const { styles, theme, className, as: RootType, disabled, required } = ctx.props

    const classNames = getClassNames(styles, {
      theme,
      className,
      disabled,
      required,
    })

    const slotProps = asSlotProps<ILabelStyles>({
      root: {
        ...ctx.data,
        class: classNames.root,
      },
    })

    return h(RootType, slotProps.root, ctx.children)
  },
})
