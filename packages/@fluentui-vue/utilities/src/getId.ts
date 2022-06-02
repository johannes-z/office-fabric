// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__'
const DEFAULT_ID_STRING = 'id__'

const _global: any = window || {}

if (_global[CURRENT_ID_PROPERTY] === undefined) {
  _global[CURRENT_ID_PROPERTY] = 0
}

/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */
export function getId (prefix?: string): string {
  const index = _global[CURRENT_ID_PROPERTY]++

  return (prefix === undefined ? DEFAULT_ID_STRING : prefix) + index
}

/**
 * Resets id counter to an (optional) number.
 *
 * @public
 */
export function resetIds (counter: number = 0): void {
  _global[CURRENT_ID_PROPERTY] = counter
}
