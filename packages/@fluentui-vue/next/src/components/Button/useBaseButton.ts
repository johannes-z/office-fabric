export function useBaseButtonProps() {
  return {
    componentRef: { type: Function, default: undefined },

    variantClassName: { type: String, default: undefined },

    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

    /**
     * Same as default slot. Useful for `v-bind`.
     */
    text: { type: String, default: undefined },

    href: { type: String, default: undefined },
  }
}

export const BaseButtonPropKeys = Object.keys(useBaseButtonProps())
