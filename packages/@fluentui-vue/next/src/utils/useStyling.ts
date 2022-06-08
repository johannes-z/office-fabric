import { getTheme } from '@/style-utilities/getTheme'

export function useStylingProps () {
  return {
    /**
     * test
     */
    styles: { type: [Object, Function], default: () => {} },
    theme: { type: Object, default: () => getTheme() },
    className: { type: String, default: undefined },
  }
}
