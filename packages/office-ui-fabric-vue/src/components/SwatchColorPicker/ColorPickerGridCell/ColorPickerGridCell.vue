<template>
  <GridCell :class="classNames.colorCell">
    <svg :class="classNames.svg"
         viewBox="0 0 20 20"
         :fill="getColorFromString(color).str">
      <circle v-if="circle"
              cx="50%"
              cy="50%"
              r="50%" />
      <rect v-else
            width="100%"
            height="100%" />
    </svg>
  </GridCell>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ITheme, mergeStyleSets } from '@uifabric/styling'

import { getStyles as getActionButtonStyles } from '../../Button/ActionButton/ActionButton.styles'
import { memoizeFunction } from '@uifabric/utilities'
import { IButtonClassNames } from '../../Button/BaseButton.classNames'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types'
import BaseComponent from '../../BaseComponent'
import { getColorFromString, GridCell } from '../../../utilities'

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
    isSplit: boolean | undefined
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
  }
)

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>()

@Component({
  components: { GridCell },
})
export default class ColorPickerGridCell extends BaseComponent {
  @Prop({ type: Boolean, default: true }) circle!: boolean
  @Prop({ type: String }) color!: string

  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) selected!: boolean

  @Prop({ type: Number, default: 20 }) height!: number
  @Prop({ type: Number, default: 20 }) width!: number
  @Prop({ type: Number, default: 2 }) borderWidth!: number

  getColorFromString = getColorFromString

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
}
</script>
