import { getCurrentInstance } from 'vue'

export function useForwardRef() {
  const instance = getCurrentInstance()!
  function handleRefChange(realRef: any) {
    instance.exposed = realRef
    instance.exposeProxy = realRef
  }
  return handleRefChange
}
