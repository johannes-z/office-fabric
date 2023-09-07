import type { Arrayable } from '@vueuse/core'
import type { VNode } from 'vue'
import { getCurrentInstance } from 'vue'

export function useRender(render: () => Arrayable<VNode | null>): void {
  const vm = getCurrentInstance()

  if (!vm)
    throw new Error('[useRender] must be called from inside a setup function')

  /**
     * In development mode, assignment render property works fine
     * but in production SFC overwrites it with an empty function
     * because no <template> section defined.
     *
     * Filthy hack to avoid this in production.
     * https://github.com/vuejs/core/issues/4980
     */
  if (import.meta.env.DEV) {
    (vm as any).render = render
  }
  else {
    Object.defineProperty(vm, 'render', {
      get: () => render,
      set: () => {},
    })
  }
}
