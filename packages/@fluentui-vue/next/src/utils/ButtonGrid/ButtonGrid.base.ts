import { computed, defineComponent, h, toRefs } from 'vue'
import { classNamesFunction } from '@fluentui-vue/utilities'
import { toMatrix, useStylingProps } from '..'
import type { IButtonGridStyleProps, IButtonGridStyles } from './ButtonGrid.types'

const getClassNames = classNamesFunction<IButtonGridStyleProps, IButtonGridStyles>()

export const ButtonGridBase = defineComponent({
  name: 'ButtonGridBase',

  inheritAttrs: false,

  props: {
    ...useStylingProps(),
    doNotContainWithinFocusZone: { type: Boolean, default: true },
    shouldFocusCircularNavigate: { type: Boolean, default: true },

    items: { type: Array, default: () => [] },
    columnCount: { type: Number, default: 1 },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      doNotContainWithinFocusZone,
      shouldFocusCircularNavigate,
      items,
      columnCount,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value, { theme: theme.value }))

    const rowsOfItems = computed(() => toMatrix(items.value, columnCount.value))

    const renderContent = () => h('table', {
      class: classNames.value.root,
    }, [
      h('tbody', {

      }, rowsOfItems.value.map((rows, rowIndex) => h('tr', {

      }, rows.map((cell, cellIndex) => h('td', {
        class: classNames.value.tableCell,
      }, {
        default: () => slots.default?.(cell, cellIndex),
      })),
      )),
      ),
    ])

    return () => doNotContainWithinFocusZone.value
      ? renderContent()
      : h('div', { // TODO replace with FocusZone
        isCircularNavigation: shouldFocusCircularNavigate.value,
        className: classNames.value.focusedContainer,
      }, renderContent())
  },
})
