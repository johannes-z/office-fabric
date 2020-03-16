<template>
  <div :class="classNames.root"
       :aria-sort="column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none'"
       :aria-colindex="columnIndex"
       role="columnheader"
       :style="{ width: columnWidth }">
    <component :is="IconComponent"
               v-if="isDraggable"
               icon-name="GripperBarVertical"
               :class-name="classNames.gripperBarVerticalStyle" />

    <span :class="classNames.cellTooltip">
      <span :id="`${parentId}-${column.key}`"
            :aria-label="column.isIconOnly ? column.name : undefined"
            :aria-labelledby="column.isIconOnly ? undefined : `${parentId}-${column.key}-name`"
            :class="classNames.cellTitle"
            @click="_onColumnClick">
        <span :id="`${parentId}-${column.key}-name`" :class="classNames.cellName">
          <!-- Column Icon -->
          <template v-if="column.iconName || column.iconClassName">
            <component :is="IconComponent"
                       :class="classNames.iconClassName"
                       :icon-name="column.iconName" />
          </template>

          <!-- Column Name -->
          <template v-if="column.isIconOnly">
            <span :class="classNames.accessibleLabel">{{ column.name }}</span>
          </template>
          <template v-else>
            {{ column.name }}
          </template>
        </span>

        <!-- Filter Indicator -->
        <component :is="IconComponent"
                   v-if="column.isFiltered"
                   :class="classNames.nearIcon"
                   icon-name="Filter" />
        <!-- Sort Indicator -->
        <component :is="IconComponent"
                   v-if="column.isSorted"
                   :class="classNames.sortIcon"
                   :icon-name="column.isSortedDescending ? 'SortDown' : 'SortUp'" />
        <!-- Group Indicator -->
        <component :is="IconComponent"
                   v-if="column.isGrouped"
                   :class="classNames.nearIcon"
                   icon-name="GroupedDescending" />
        <!-- ?? -->
        <component :is="IconComponent"
                   v-if="column.columnActionsMode === ColumnActionsMode.hasDropdown && !column.isIconOnly"
                   icon-name="ChevronDown" />
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { DEFAULT_CELL_STYLE_PROPS } from '../DetailsRow/DetailsRow.styles'
import { Icon } from '../../Icon'
import { ColumnActionsMode, IColumn } from '../DetailsList.types'

const MOUSEDOWN_PRIMARY_BUTTON = 0 // for mouse down event we are using ev.button property, 0 means left button

const getClassNames = classNamesFunction()
const TRANSITION_DURATION_DRAG = 200 // ms
const TRANSITION_DURATION_DROP = 1500 // ms
const CLASSNAME_ADD_INTERVAL = 20 // ms

@Component({
  components: {},
})
export default class DetailsColumn extends BaseComponent {
  @Prop({ type: Function, default: null }) onColumnClick!: (ev: MouseEvent, column: IColumn) => void
  @Prop({ type: Object, required: true }) column!: any
  @Prop({ type: Number, required: true }) columnIndex!: number
  @Prop({ type: Number, required: true }) parentId!: number
  @Prop({ type: Boolean, default: false }) isDraggable!: boolean
  @Prop({ type: Object, default: () => DEFAULT_CELL_STYLE_PROPS }) cellStyleProps!: any

  ColumnActionsMode = ColumnActionsMode

  get IconComponent () {
    return Icon// this.useFastIcons ? FontIcon : Icon;
  }

  get classNames () {
    const {
      column,
      columnIndex,
      styles,
      theme,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    } = this

    return getClassNames(styles, {
      theme: theme!,
      headerClassName: column.headerClassName,
      iconClassName: column.iconClassName,
      isActionable: column.columnActionsMode !== ColumnActionsMode.disabled,
      isEmpty: !column.name,
      isIconVisible: column.isSorted || column.isGrouped || column.isFiltered,
      isPadded: column.isPadded,
      isIconOnly: column.isIconOnly,
      cellStyleProps,
      transitionDurationDrag: TRANSITION_DURATION_DRAG,
      transitionDurationDrop: TRANSITION_DURATION_DROP,
    })
  }

  get columnWidth () {
    const { column, cellStyleProps } = this

    return column.calculatedWidth! +
      cellStyleProps.cellLeftPadding +
      cellStyleProps.cellRightPadding +
      (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0) +
      'px'
  }

  _onColumnClick (ev: MouseEvent): void {
    const { onColumnClick, column } = this

    if (column.columnActionsMode === ColumnActionsMode.disabled) {
      return
    }

    if (column.onColumnClick) {
      column.onColumnClick(ev, column)
    }

    if (onColumnClick) {
      onColumnClick(ev, column)
    }
  }
}
</script>
