import { type Slot, type SlotsType, type VNode, computed } from 'vue'

export function useSlotHelpers(slots: Readonly<SlotsType>, slotKey: string, slotProps?: Record<string, any>) {
  const slot = computed<Slot<any> | undefined>(() => slots[slotKey])
  const renderSlot = () => slot.value?.(slotProps)

  /**
   * The rendered content of the slot
   */
  const slotContent = computed(() => renderSlot())

  /**
   * Checks if all slot content is text, including nested elements
   */
  const isPureText = computed(() => {
    function checkVNodeType(vnode: VNode): boolean {
      if (typeof vnode.children === 'string' && vnode.component == null)
        return true

      if (Array.isArray(vnode.children))
        return (vnode.children as VNode[])?.every(child => checkVNodeType(child))

      return false
    }
    return slotContent.value?.every(checkVNodeType)
  })

  /**
   * Checks if direct slot content is text
   */
  const isText = computed(() => {
    return slotContent.value?.every((vnode: VNode) => typeof vnode.children === 'string' && vnode.component == null)
  })

  return {
    renderSlot,
    slot,
    slotContent,
    isText,
    isPureText,
  }
}
