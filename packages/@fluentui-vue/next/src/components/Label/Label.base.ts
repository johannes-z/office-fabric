import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ILabelStyleProps, ILabelStyles } from './Label.types'
import { asSlotProps, defineFunctionalComponent, makeStylingProps } from '@/utils/'

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>()

export const LabelBase = defineFunctionalComponent({
  name: 'LabelBase',

  props: {
    ...makeStylingProps(),

    as: { type: String, default: 'label' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  render(props, { attrs, slots }) {
    const { styles, theme, className, as: RootType = 'label', disabled, required } = props

    const classNames = getClassNames(styles, {
      theme,
      className,
      disabled,
      required,
    })

    const slotProps = asSlotProps<ILabelStyles>({
      root: {
        ...attrs,
        class: classNames.root,
      },
    })

    return h(RootType, slotProps.root, slots)
  },
})
