import { refDefault } from '@vueuse/core'
import { type Ref, ref, watch } from 'vue'

/**
 * Creates a new ref that's based on the provided prop. If the prop is null or undefined, the default value will be
 * used, if any.
 * When the provided prop changes, the ref is also updated.
 * @param props The component props.
 * @param prop The property name to sync with.
 * @param defaultValue The default value in case the prop is null or undefined.
 * @returns Ref that's synced with the provided prop.
 */
export function useSyncedRef<
Props extends object & { [key in Prop as `onUpdate:${Prop}`]: ((val: any) => void) | undefined },
Prop extends Extract<keyof Props, string>,
Inner = Props[Prop],
>(
  props: Props,
  prop: Prop,
  defaultValue?: Props[Prop],
) {
  const syncedRef = ref(props[prop]) as Ref<Props[Prop]>
  watch(() => props[prop], (newValue) => {
    syncedRef.value = newValue
  })

  return refDefault(syncedRef, defaultValue)
}
