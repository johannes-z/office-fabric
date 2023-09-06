import { defineComponent, h, toRefs } from 'vue'
import { css } from '@fluentui-vue/utilities'
import { makeStylingProps } from '..'
import { ActionButton } from '@/components'

export const ButtonGridCell = defineComponent({
  name: 'ButtonGridCell',

  emits: [
    'click',
  ],

  props: {
    ...makeStylingProps(),
    item: { type: Object, default: undefined },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    cellIsSelectedStyle: { type: String, default: '' },
    cellDisabledStyle: { type: String, default: '' },
    getClassNames: { type: Function, default: undefined },
  },

  setup(props, { attrs, emit, slots }) {
    const {
      theme,
      styles,
      className,
      item,
      selected,
      disabled,
      label,
      cellIsSelectedStyle,
      cellDisabledStyle,
    } = toRefs(props)

    return () => h(ActionButton, {
      ...attrs,
      label: label.value,
      'aria-label': label.value,
      class: css(className.value, {
        [`${cellIsSelectedStyle.value}`]: selected.value,
        [`${cellDisabledStyle.value}`]: disabled.value,
      }),
      getClassNames: props.getClassNames,
      onClick: (ev: PointerEvent) => {
        if (disabled.value)
          return
        emit('click', ev, item.value)
      },
    }, {
      default: () => slots.default?.(item.value),
    })
  },
})
