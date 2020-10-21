import { ITheme } from '@uifabric/styling'
import { loadTheme } from './loadTheme'

export function getTheme (): ITheme {
  return loadTheme({})
}
