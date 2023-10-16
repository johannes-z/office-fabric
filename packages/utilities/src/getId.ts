import { Stylesheet } from '@fluentui/merge-styles'
import { getWindow } from './dom/getWindow'

// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__'
const DEFAULT_ID_STRING = 'id__'

const _global: any = getWindow() || {}

if (_global[CURRENT_ID_PROPERTY] === undefined)
  _global[CURRENT_ID_PROPERTY] = 0

let _initializedStylesheetResets = false

/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */
export function getId(prefix?: string, providedId?:string): string {
  if (!_initializedStylesheetResets) {
    // Configure ids to reset on stylesheet resets.
    const stylesheet = Stylesheet.getInstance()

    if (stylesheet && stylesheet.onReset)
      stylesheet.onReset(resetIds)

    _initializedStylesheetResets = true
  }

  const index = _global[CURRENT_ID_PROPERTY]++

  return providedId || (prefix === undefined ? DEFAULT_ID_STRING : prefix) + index
}

/**
 * Resets id counter to an (optional) number.
 *
 * @public
 */
export function resetIds(counter = 0): void {
  _global[CURRENT_ID_PROPERTY] = counter
}
