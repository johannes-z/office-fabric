import { DirectionalHint, type Point, classNamesFunction, getFirstVisibleElementFromSelector } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { Callout, type ICalloutProps, type Target } from '..'
import { getCalloutOffsetStyles, getCalloutStyles } from './Keytip.styles'
import type { IKeytipStyleProps, IKeytipStyles } from '.'
import { ktpTargetFromSequences, mergeOverflows } from '@/utils/keytips/KeytipUtils'
import { asSlotProps, makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>()

export const KeytipContentBase = defineComponent({
  name: 'KeytipContentBase ',

  props: {
    ...makeStylingProps(),

    content: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots, emit, expose }) {
    const {
      content,
      styles,
      theme,
      disabled,
      visible,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value!, {
      theme: theme.value!,
      disabled: disabled.value,
      visible: visible.value,
    }))

    return () => h('div', {
      className: classNames.value.container,
    }, [
      h('span', {
        className: classNames.value.root,
      }, content.value),
    ])
  },
})
