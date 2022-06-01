
// Selection definitions:
//
// Anchor index: the point from which a range selection starts.
// Focus index: the point from which layout movement originates from.
//
// These two can differ. Tests:
//
// If you start at index 5
// Shift click to index 10
//    The focus is 10, the anchor is 5.
// If you shift click at index 0
//    The anchor remains at 5, the items between 0 and 5 are selected and everything else is cleared.
// If you click index 8
//    The anchor and focus are set to 8.

import Vue from 'vue'
import { IObjectWithKey, ISelection, SelectionMode } from '.'

const SELECTION_DISABLED_ATTRIBUTE_NAME = 'data-selection-disabled'
const SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index'
const SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle'
const SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke'
const SELECTION_INVOKE_TOUCH_ATTRIBUTE_NAME = 'data-selection-touch-invoke'
const SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle'
const SELECTION_SELECT_ATTRIBUTE_NAME = 'data-selection-select'

/**
 * {@docCategory Selection}
 */
export interface ISelectionZone {
  /**
   * Method to ignore subsequent focus.
   */
  ignoreNextFocus: () => void;
}

/**
 * {@docCategory Selection}
 */
export interface ISelectionZoneProps {
  /**
   * Reference to the component interface.
   */
  componentRef?: () => void;
  /**
   * Required {@link ISelection} instance bound to the {@link SelectionZone}.
   */
  selection: ISelection;
  /**
   * @deprecated No longer in use, focus is now managed by {@link FocusZone}.
   */
  layout?: {};
  /**
   * The mode of Selection, where the value is one of
   * 'none', 'single', or 'multiple'.
   *
   * @defaultvalue {@link SelectionMode.multiple}
   */
  selectionMode?: SelectionMode;
  /**
   * If true, selection is preserved on outer click.
   */
  selectionPreservedOnEmptyClick?: boolean;
  /**
   * If true, disables automatic selection on input elements.
   */
  disableAutoSelectOnInputElements?: boolean;
  /**
   * If true, modal selection is enabled on touch event.
   */
  enterModalOnTouch?: boolean;
  /**
   * Determines whether elements with the attribute `data-selection-touch-invoke` should be used as invocation targets
   * for an item if the user is using touch.
   *
   * @defaultvalue false
   */
  enableTouchInvocationTarget?: boolean;
  /**
   * Determines if an item is selected on focus.
   *
   * @defaultvalue true
   */
  isSelectedOnFocus?: boolean;
  /**
   * Determines if elements within the selection zone that DO NOT have the 'data-selection-toggle' or
   * 'data-selection-all-toggle' attribute are clickable and can alter the selection.
   *
   * @defaultvalue true
   */
  selectionClearedOnSurfaceClick?: boolean;
  /**
   * Optional callback for when an item is
   * invoked via ENTER or double-click.
   */
  onItemInvoked?: (item?: IObjectWithKey, index?: number, ev?: Event) => void;
  /**
   * Optional callback for when an
   * item's contextual menu action occurs.
   */
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
  /**
   * Additional CSS class(es) to apply to the SelectionZone.
   */
  className?: string;
}

/**
 * {@docCategory Selection}
 */
export interface ISelectionZoneState {
  isModal: boolean | undefined;
}

export const SelectionZone = Vue.extend({
  props: {
    isSelectedOnFocus: { type: Boolean, default: true },
    selectionMode: { type: Number as () => SelectionMode, default: SelectionMode.multiple },
  },
})
