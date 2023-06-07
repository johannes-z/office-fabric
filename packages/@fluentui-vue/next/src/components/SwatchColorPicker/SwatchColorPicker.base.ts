import { classNamesFunction } from '@fluentui-vue/utilities'
import { type PropType, computed, defineComponent, h, ref, toRefs } from 'vue'
import { ColorPickerGridCell, type IColorCellProps, type ISwatchColorPickerStyleProps, type ISwatchColorPickerStyles } from '.'
import { useStylingProps } from '@/utils'
import { ButtonGrid } from '@/utils/ButtonGrid'

const getClassNames = classNamesFunction<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>()

const COMPONENT_NAME = 'SwatchColorPicker'

export const SwatchColorPickerBase = defineComponent({
  name: COMPONENT_NAME,

  props: {
    ...useStylingProps(),
    colorCells: { type: Array as PropType<IColorCellProps[]>, default: () => [] },
    cellShape: { type: String, default: 'circle', validator: (v: string) => ['circle', 'square'].includes(v) },
    cellHeight: { type: Number, default: undefined },
    cellWidth: { type: Number, default: undefined },
    cellBorderWidth: { type: Number, default: undefined },
    cellMargin: { type: Number, default: undefined },
    disabled: { type: Boolean, default: false },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      className,
      colorCells,
      cellShape,
      cellHeight,
      cellWidth,
      cellBorderWidth,
      cellMargin,
      disabled,
    } = toRefs(props)

    const selectedId = ref<null | string>(null)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      className: className.value,
      cellMargin: cellMargin.value,
    }))

    const gridStyles = computed(() => ({
      root: classNames.value.root,
      tableCell: classNames.value.tableCell,
      focusedContainer: classNames.value.focusedContainer,
    }))

    const itemsWithIndex = computed(() => colorCells.value.map((item, index) => ({ ...item, index })))

    const renderOption = (item: IColorCellProps) => h(ColorPickerGridCell, {
      item,
      color: item.color,
      label: item.label,
      circle: cellShape.value === 'circle',
      height: cellHeight.value,
      width: cellWidth.value,
      borderWidth: cellBorderWidth.value,
      disabled: disabled.value,
      selected: selectedId.value === item.id,
      onClick: () => {
        selectedId.value = item.id
      },
    })

    return () => h(ButtonGrid, {
      theme: theme.value,
      items: itemsWithIndex.value,
      styles: gridStyles.value,
    }, {
      default: renderOption,
    })
  },
})
