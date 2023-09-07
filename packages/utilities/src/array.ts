/**
 * Helper to find the index of an item within an array, using a callback to
 * determine the match.
 *
 * @public
 * @param array - Array to search.
 * @param cb - Callback which returns true on matches.
 * @param fromIndex - Optional index to start from (defaults to 0)
 */
export function findIndex<T>(array: T[], cb: (item: T, index: number) => boolean, fromIndex: number = 0): number {
  let index = -1

  for (let i = fromIndex; i < array.length; i++) {
    if (cb(array[i], i)) {
      index = i
      break
    }
  }

  return index
}
