import { classNamesFunction } from '@fluentui-vue/utilities'
import { type PropType, h } from 'vue'
import { type ISpinnerProps, type ISpinnerStyleProps, type ISpinnerStyles, SpinnerSize } from './Spinner.types'
import { asSlotProps, defineFunctionalComponent, makeStylingProps, propsFactoryFromInterface } from '@/utils'

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>()

export const makeSpinnerProps = propsFactoryFromInterface<ISpinnerProps>()({
  ...makeStylingProps(),

  label: { type: String, default: null },
  labelPosition: {
    type: String as PropType<ISpinnerStyleProps['labelPosition']>,
    default: 'bottom' as const,
  },
  size: { type: Number as PropType<SpinnerSize>, default: SpinnerSize.medium },

}, 'Spinner')

export const SpinnerBase = defineFunctionalComponent({
  name: 'SpinnerBase',

  props: makeSpinnerProps(),

  render(props, { attrs, slots }) {
    const { theme, styles, className, size, label, labelPosition } = props
    const ariaLabel = attrs.ariaLabel as string
    const ariaLive = attrs.ariaLabel as string

    const classNames = getClassNames(styles, {
      theme,
      className,
      labelPosition,
      size,
    })

    const slotProps = asSlotProps<ISpinnerStyles>({
      root: {
        ariaLive: 'polite',
        ...attrs,
        class: classNames.root,
      },
      circle: {
        class: classNames.circle,
      },
      label: {
        class: classNames.label,
      },
      screenReaderText: {
        class: classNames.screenReaderText,
      },
      status: {
        role: 'status',
        ariaLive,
      },
    })

    return h('div', slotProps.root, [
      h('div', slotProps.circle),
      label
        ? h('div', slotProps.label, slots.default ? slots : label)
        : undefined,
      attrs.ariaLabel
        ? h('div', slotProps.status, [
        // TODO DelayedRender
          h('div', slotProps.screenReaderText, ariaLabel),
        ])
        : undefined,
    ])
  },
})
