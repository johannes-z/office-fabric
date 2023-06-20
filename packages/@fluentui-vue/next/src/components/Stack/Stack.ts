import { getTheme } from '@fluentui-vue/style-utilities'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { type PropType, h } from 'vue'
import { styles } from './Stack.styles'
import type { Alignment, IStackProps } from './Stack.types'
import { defineFunctionalComponent, makeStylingProps, propsFactoryFromInterface, useBooleanProp } from '@/utils/'

const getClassNames = classNamesFunction()

export const makeStackProps = propsFactoryFromInterface<IStackProps>()({
  ...makeStylingProps(),

  enableScopedSelectors: { type: Boolean, default: false },
  verticalFill: { type: Boolean, default: false },
  horizontal: { type: Boolean, default: false },
  reversed: { type: Boolean, default: false },
  grow: { type: Boolean, default: false },
  wrap: { type: Boolean, default: false },
  horizontalAlign: { type: String as PropType<Alignment>, default: undefined },
  verticalAlign: { type: String as PropType<Alignment>, default: undefined },
  disableShrink: { type: Boolean, default: false },
}, 'Stack')

export const Stack = defineFunctionalComponent({
  props: makeStackProps(),

  render(props, { attrs, slots }) {
    const { theme = getTheme(), tokens, verticalFill, horizontalAlign, verticalAlign, className, horizontal, reversed, grow, wrap, disableShrink } = props

    const classNames: any = getClassNames(mergeStyleSets(styles({
      className,
      verticalFill,
      horizontal,
      reversed,
      grow,
      wrap,
      horizontalAlign,
      verticalAlign,
      disableShrink,
    }, theme, tokens), props.styles))

    return h('div', {
      ...attrs,
      class: classNames.root,
    }, slots)
  },
})
