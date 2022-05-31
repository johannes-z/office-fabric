import { asSlotProps, useStylingProps } from '@/utils'
import { classNamesFunction } from '@fluentui-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import type { ISpinnerStyleProps, ISpinnerStyles } from './Spinner.types'

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>()

export const SpinnerBase = Vue.extend({
  name: 'SpinnerBase',

  functional: true,

  props: {
    ...useStylingProps(),

    label: { type: String, default: null },
    labelPosition: {
      type: String as () => ISpinnerStyleProps['labelPosition'],
      default: 'bottom' as const,
    },
    size: { type: Number, default: 20 },
  },

  render (h: CreateElement, ctx): VNode {
    const { styles, className, size, label, labelPosition } = ctx.props

    const classNames = getClassNames(styles, {
      className,
      labelPosition,
      size,
    })

    const slotProps = asSlotProps<ISpinnerStyles>({
      root: {
        ...ctx.data,
        class: classNames.root,
      },
      circle: {
        class: classNames.circle,
      },
      label: {
        class: classNames.label,
      },
    })

    return h('div', slotProps.root, [
      h('div', slotProps.circle),
      h('div', slotProps.label, ctx.children || label),
    ])
  },
})
