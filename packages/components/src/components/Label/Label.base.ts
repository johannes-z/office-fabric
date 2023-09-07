import { classNamesFunction } from '@fluentui-vue/utilities'
import { h } from 'vue'
import type { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types'
import { asSlotProps, defineFunctionalComponent, makeStylingProps, propsFactoryFromInterface } from '@/utils/'

const getClassNames = classNamesFunction<ILabelStyleProps, ILabelStyles>()

export const makeLabelProps = propsFactoryFromInterface<ILabelProps>()({
  ...makeStylingProps(),
  as: { type: String, default: 'label' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
}, 'Label')

export const LabelBase = defineFunctionalComponent({
  name: 'LabelBase',

  props: makeLabelProps(),

  render(props, { attrs, slots }) {
    const {
      styles,
      theme,
      className,
      as: RootType,
      disabled,
      required,
    } = props

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
