/**
 * Convert the given array to a matrix with columnCount number
 * of columns.
 *
 * @public
 * @param items - The array to convert
 * @param columnCount - The number of columns for the resulting matrix
 * @returns A matrix of items
 */
export function toMatrix<T>(items: T[], columnCount: number): T[][] {
  return items.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % columnCount === 0)
      rows.push([currentValue])

    else
      rows[rows.length - 1].push(currentValue)

    return rows
  }, [] as T[][])
}
