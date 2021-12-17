import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import { classNamesFunction } from '@uifabric-vue/utilities'
import Vue, { VNode, PropType } from 'vue'
import { ISpinnerStyleProps, ISpinnerStyles } from '.'
import { ISpinnerProps, SpinnerLabelPosition } from './Spinner.types'

const getClassNames = classNamesFunction<ISpinnerStyleProps, ISpinnerStyles>()

export const SpinnerBase = Vue.extend({
  name: 'SpinnerBase',

  functional: true,

  props: {
    ...withThemeableProps(),

    label: { type: String, default: null },
    labelPosition: { type: String as PropType<SpinnerLabelPosition>, default: 'bottom' },
    size: { type: Number, default: 20 },
  } as MappedType<ISpinnerProps>,

  render (h, ctx): VNode {
    const { theme, styles, className, size, label, labelPosition } = ctx.props
    const classNames: any = getClassNames(styles, {
      theme: theme!,
      size,
      className,
      labelPosition,
    })

    const $circle = h('div', { class: classNames.circle })
    const $label = (ctx.scopedSlots.default || label) && h('div',
      { class: classNames.label }, ctx.scopedSlots.default
        ? [
          ctx.scopedSlots.default({}),
        ]
        : label)

    return h('div', { class: classNames.root }, [
      $circle,
      $label,
    ])
  },
})
