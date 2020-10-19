import { Vue, Component, Prop } from 'vue-property-decorator'
import { ITheme, mergeStyleSets } from '@uifabric/styling'

import { getStyles as getActionButtonStyles } from '../../Button/ActionButton/ActionButton.styles'
import { memoizeFunction, classNamesFunction } from '@uifabric-vue/utilities'
import { IButtonClassNames } from '../../Button/BaseButton.classNames'

import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types'
import BaseComponent from '../../BaseComponent'
import { getColorFromString, GridCell } from '../../../utilities'
import { CreateElement } from 'vue'

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
        !disabled &&
          !checked && {
          selectors: {
            ':hover': styles.rootHovered,
            ':focus': styles.rootFocused,
            ':active': styles.rootPressed,
          },
        },
        disabled && checked && [styles.rootCheckedDisabled],
        !disabled &&
          checked && {
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

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>()

@Component({
  components: { GridCell },
})
export class ColorPickerGridCellBase extends BaseComponent {
  @Prop({ type: Boolean, default: true }) circle!: boolean
  @Prop({ type: String }) color!: string

  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) selected!: boolean

  @Prop({ type: Number, default: 20 }) height!: number
  @Prop({ type: Number, default: 20 }) width!: number
  @Prop({ type: Number, default: 2 }) borderWidth!: number

  get classNames () {
    const { styles, theme, circle, color, disabled, selected, height, width, borderWidth } = this
    return getClassNames(styles, {
      theme,
      disabled,
      selected,
      circle,
      isWhite: this.isWhiteCell(color),
      height,
      width,
      borderWidth,
    })
  }

  isWhiteCell (inputColor: string | undefined): boolean {
    const color = getColorFromString(inputColor!)
    return color!.hex === 'ffffff'
  }

  render (h: CreateElement) {
    const { classNames, color, circle } = this
    return h(GridCell, {
      class: classNames.colorCell,
    }, [
      h('svg', {
        class: classNames.svg,
        attrs: {
          viewBox: '0 0 20 20',
          fill: getColorFromString(color)!.str,
        },
      }, [
        circle
          ? h('circle', { attrs: { cx: '50%', cy: '50%', r: '50% ' } })
          : h('rect', { attrs: { width: '100%', height: '100%' } }),
      ]),
    ])
  }
}
