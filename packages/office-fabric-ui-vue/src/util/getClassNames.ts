import { mergeStyleSets } from '@uifabric/merge-styles'

export function getClassNames (getStyles: any, props: any): any {
  return mergeStyleSets(getStyles(props))
}
