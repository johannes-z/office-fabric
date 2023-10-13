export function useBaseButtonProps() {
  return {
    getClassNames: { type: Function, default: undefined },

    variantClassName: { type: String, default: undefined },

    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    defaultStopClickPropagation: { type: Boolean, default: true },

    /**
     * Same as default slot. Useful for `v-bind`.
     */
    text: { type: String, default: undefined },

    href: { type: String, default: undefined },
    onClick: { type: Function, default: undefined },

  }
}

export const BaseButtonPropKeys = Object.keys(useBaseButtonProps())
