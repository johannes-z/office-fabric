import { defineComponent, h } from 'vue'
import { type IFocusTrapCalloutProps } from './FocusTrapCallout.types'
import { Callout } from '.'

export const FocusTrapCallout = defineComponent({
  name: 'FocusTrapCallout',

  setup(props: IFocusTrapCalloutProps, { slots }) {
    return () => h(Callout, {
      ...props,
    }, () => [
      h(FocusTrapZone, {
        disabled: props.hidden,
        ...props.focusTrapProps,
      }, () => slots.default && slots.default()),
    ])
  },
})
