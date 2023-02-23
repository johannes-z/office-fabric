import { classNamesFunction } from '@fluentui-vue/utilities'
import { defineComponent, h } from 'vue'
import type { ILabelStyleProps, ILabelStyles } from './Label.types'
import { asSlotProps, useStylingProps } from '@/utils/'

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>()

export const LabelBase = (props, { attrs, slots }) => {
  const { styles, theme, className, as: RootType = 'label', disabled, required } = props

  
  const isDisabled = disabled != null && disabled !== false
  const isRequired = required != null && required !== false

  const classNames = getClassNames(styles, {
    theme,
    className,
    disabled: isDisabled,
    required: isRequired,
  })

  const slotProps = asSlotProps<ILabelStyles>({
    root: {
      ...attrs,
      class: classNames.root,
    },
  })

  return h(RootType, slotProps.root, slots)
}

LabelBase.props = Object.keys({
  ...useStylingProps(),

  as: { type: String, default: 'label' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
})
