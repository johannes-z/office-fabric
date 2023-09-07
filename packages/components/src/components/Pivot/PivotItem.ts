import { type PropType, defineComponent, h } from 'vue'
import type { IPivotItemProps } from '.'

const COMPONENT_NAME = 'PivotItem'

export const PivotItem = defineComponent({
  name: 'PivotItem',

  props: {
    itemCount: { type: Number, default: undefined },
    itemIcon: { type: String, default: undefined },
    headerText: { type: String, default: undefined },
    headerButtonProps: { type: Object as PropType<IPivotItemProps['headerButtonProps']>, default: undefined },
  },

  setup(props, { slots }) {
    return () => h('div', slots.default?.())
  },
})
