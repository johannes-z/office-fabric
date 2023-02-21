import type { Ref } from 'vue'
import { ref as useRef } from 'vue'

/** Updater callbacks returned by `useBoolean`. */
export interface IUseBooleanCallbacks {
  /** Set the value to true. Always has the same identity. */
  setTrue: () => void
  /** Set the value to false. Always has the same identity. */
  setFalse: () => void
  /** Toggle the value. Always has the same identity. */
  toggle: () => void
}

/**
 * Hook to store a value and generate callbacks for setting the value to true or false.
 * The identity of the callbacks will always stay the same.
 *
 * @param initialState - Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export function useBoolean(initialState: boolean): [Ref<boolean>, IUseBooleanCallbacks] {
  const value = useRef(initialState)

  const setTrue = () => {
    value.value = (true)
  }
  const setFalse = () => {
    value.value = (false)
  }
  const toggle = () => {
    value.value = !value.value
  }

  return [value, { setTrue, setFalse, toggle }]
}
