
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

import { css } from '@uifabric-vue/utilities'
import Vue, { CreateElement, VNode } from 'vue'
import { SelectionMode } from './interfaces'

const SELECTION_DISABLED_ATTRIBUTE_NAME = 'data-selection-disabled'
const SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index'
const SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle'
const SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke'
const SELECTION_INVOKE_TOUCH_ATTRIBUTE_NAME = 'data-selection-touch-invoke'
const SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle'
const SELECTION_SELECT_ATTRIBUTE_NAME = 'data-selection-select'

export const SelectionZone = Vue.extend({
  props: {
    selection: { type: Object, required: true },
    selectionMode: { type: Number as () => SelectionMode, default: SelectionMode.multiple },
    selectionPreservedOnEmptyClick: { type: Boolean, default: false },
    disableAutoSelectOnInputElements: { type: Boolean, default: false },
  },

  data () {
    return {
      isModal: false,
    }
  },

  methods: {
    onKeyDown () {

    },
    onMouseDown () {

    },
    onClick () {

    },
  },

  render (h: CreateElement): VNode {
    return h('div', {
      ref: 'root',
      class: css('ms-SelectionZone', this.$attrs.class, {
        'ms-SelectionZone--modal': !!this.isModal,
      }),
      on: {
        keydown: this.onKeyDown,
        mousedown: this.onMouseDown,
        click: this.onClick,
      },
    }, [
      this.$slots.default,
    ])
  },
})
