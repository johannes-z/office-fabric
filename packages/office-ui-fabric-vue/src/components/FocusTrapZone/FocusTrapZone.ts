import { MappedType } from '@/types'
import { withThemeableProps } from '@/useThemeable'
import Vue, { VNode } from 'vue'
import { IFocusTrapZoneProps } from './FocusTrapZone.types'

type Refs = {
  firstBumper: HTMLDivElement
  lastBumper: HTMLDivElement
  mergedRootRef: HTMLDivElement
}
const refs: { [K in keyof Refs]: K } = {
  firstBumper: 'firstBumper',
  lastBumper: 'lastBumper',
  mergedRootRef: 'mergedRootRef',
}

export const FocusTrapZone = Vue.extend({
  name: 'FocusTrapZone',

  props: {
    ...withThemeableProps(),

    disabled: { type: Boolean, default: false },
    ariaLabelledBy: { type: String, default: undefined },
  } as MappedType<IFocusTrapZoneProps>,

  render (h): VNode {
    const { ariaLabelledBy, className, disabled } = this

    const bumperProps = {
      'aria-hidden': true,
      style: {
        pointerEvents: 'none',
        position: 'fixed', // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
      },
      tabIndex: disabled ? -1 : 0, // make bumpers tabbable only when enabled
      'data-is-visible': true,
    }

    // TODO implementation

    return h('div', {
      class: className,
      ref: 'mergedRootRef',
      attrs: {
        ...this.$attrs,
        'aria-labelledby': ariaLabelledBy,
      },
      on: {
        // focusCapture: onRootFocusCapture,
        // focus: onFocus,
        // blur: onBlur,
        // blurCapute: onRootBlurCapture
      },
    }, [
      h('div', { attrs: bumperProps, ref: refs.firstBumper }),
      this.$scopedSlots.default?.({}),
      h('div', { attrs: bumperProps, ref: refs.lastBumper }),
    ])
  },
})
