import { classNamesFunction, memoizeFunction } from '@fluentui-vue/utilities'
import type { ITheme } from '@fluentui-vue/theme'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { IButtonClassNames } from '../Button/Button.classNames'
import { getStyles as getActionButtonStyles } from '../Button/ActionButton/ActionButton.styles'
import type { IColorCellProps, IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types'
import { getColorFromString, useStylingProps } from '@/utils'
import { ButtonGridCell } from '@/utils/ButtonGrid'

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>()

/** Validate if the cell's color is white or not to apply whiteCell style */
function isWhiteCell(inputColor: string): boolean {
  const currentColor = getColorFromString(inputColor!)
  return currentColor?.hex === 'ffffff'
}

const getColorPickerGridCellButtonClassNames = memoizeFunction(
  (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined,
  ): IButtonClassNames => {
    const styles = getActionButtonStyles(theme)
    return mergeStyleSets({
      root: [
        'ms-Button',
        styles.root,
        variantClassName,
        className,
        checked && ['is-checked', styles.rootChecked],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled
          && !checked && {
          selectors: {
            ':hover': styles.rootHovered,
            ':focus': styles.rootFocused,
            ':active': styles.rootPressed,
          },
        },
        disabled && checked && [styles.rootCheckedDisabled],
        !disabled
          && checked && {
          selectors: {
            ':hover': styles.rootCheckedHovered,
            ':active': styles.rootCheckedPressed,
          },
        },
      ],
      flexContainer: ['ms-Button-flexContainer', styles.flexContainer],
    })
  },
)

export const ColorPickerGridCellBase = defineComponent({
  name: 'ColorPickerGridCellBase',

  inheritAttrs: false,

  props: {
    ...useStylingProps(),

    disabled: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    height: { type: Number, default: undefined },
    width: { type: Number, default: undefined },
    borderWidth: { type: Number, default: undefined },

    color: { type: String, default: undefined },
    label: { type: String, default: undefined },
    item: { type: Object, default: undefined },
  },

  setup(props, { attrs, emit, slots }) {
    const {
      styles,
      theme,
      disabled,
      selected,
      circle,
      height,
      width,
      borderWidth,
      color,
      item,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value, {
      theme: theme.value,
      disabled: disabled.value,
      selected: selected.value,
      circle: circle.value,
      isWhite: isWhiteCell(color.value!),
      height: height.value,
      width: width.value,
      borderWidth: borderWidth.value,
    }))

    // Render the core of a color cell
    const onRenderColorOption = (colorOption: IColorCellProps) => {
      return h('svg', {
        'class': classNames.value.svg,
        'role': 'img',
        'aria-label': colorOption.label,
        'viewBox': '0 0 20 20',
        'fill': getColorFromString(colorOption.color)!.str,
      }, [
        circle.value
          ? h('circle', { cx: '50%', cy: '50%', r: '50%' })
          : h('rect', { width: '100%', height: '100%' }),
      ])
    }

    return () => h(ButtonGridCell, {
      ...attrs,
      item: item.value,
      disabled: disabled.value,
      label: item.value?.label,
      index: item.value?.index,
      class: classNames.value.colorCell,
      getClassNames: getColorPickerGridCellButtonClassNames,
    }, {
      default: onRenderColorOption,
    })
  },
})
