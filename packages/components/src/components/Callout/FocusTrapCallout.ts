import { defineComponent, h } from "vue";
import { Callout, type IFocusTrapCalloutProps } from ".";
import { FocusTrapZone } from "..";

export const FocusTrapCallout = defineComponent({
    name: 'FocusTrapCallout',

    setup(props:IFocusTrapCalloutProps, { slots }) {
        return () => h(Callout, {
            ...props
        }, () => [
            h(FocusTrapZone, {
                disabled: props.hidden,
                ...props.focusTrapProps
            }, () => slots.default && slots.default())
        ])
    }
});