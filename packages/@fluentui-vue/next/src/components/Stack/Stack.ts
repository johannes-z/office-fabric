import { getTheme } from '@fluentui-vue/style-utilities'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { h } from 'vue'
import { styles } from './Stack.styles'
import { defineFunctionalComponent, useBooleanProp, useStylingProps } from '@/utils/'

const getClassNames = classNamesFunction()

export const Stack = defineFunctionalComponent({
  ...useStylingProps(),

  verticalFill: { type: String, default: '' },
  horizontal: { type: Boolean, default: false },
  reversed: { type: Boolean, default: false },
  childrenGap: { type: Number, default: 0 },
  grow: { type: Boolean, default: false },
  wrap: { type: Boolean, default: false },
  horizontalAlign: { type: String, default: '' },
  verticalAlign: { type: String, default: '' },
  disableShrink: { type: Boolean, default: false },

  tokens: { type: Object, default: () => {} },
}, (props, { attrs, slots }) => {
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
})

// export const Stack = (props, { attrs, slots }) => {
//   const { theme = getTheme(), tokens, verticalFill, horizontalAlign, verticalAlign, className } = props

//   const horizontal = useBooleanProp(props.horizontal)
//   const reversed = useBooleanProp(props.reversed)
//   const grow = useBooleanProp(props.grow)
//   const wrap = useBooleanProp(props.wrap)
//   const disableShrink = useBooleanProp(props.disableShrink)

//   console.log(Stack);

//   const classNames: any = getClassNames(mergeStyleSets(styles({
//     className,
//     verticalFill,
//     horizontal,
//     reversed,
//     grow,
//     wrap,
//     horizontalAlign,
//     verticalAlign,
//     disableShrink,
//   }, theme, tokens), props.styles))

//   return h('div', {
//     ...attrs,
//     class: classNames.root,
//   }, slots)
// }

// Stack.props = Object.keys({
//   ...useStylingProps(),

//   verticalFill: { type: String, default: '' },
//   horizontal: { type: Boolean, default: false },
//   reversed: { type: Boolean, default: false },
//   childrenGap: { type: Number, default: 0 },
//   grow: { type: Boolean, default: false },
//   wrap: { type: Boolean, default: false },
//   horizontalAlign: { type: String, default: '' },
//   verticalAlign: { type: String, default: '' },
//   disableShrink: { type: Boolean, default: false },

//   tokens: { type: Object, default: () => {} },
// })
