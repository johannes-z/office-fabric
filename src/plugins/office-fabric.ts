import Vue, { VueConstructor } from 'vue'
import * as Components from '@/components/'
import { semanticColors } from '@/util'
import { IPalette } from '@/types/IPalette'

const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase()

export interface ITheme {
  prefix?: string
  theme?: IPalette
  defaultColors?: any
  variant: 'none' | 'neutral' | 'soft' | 'strong'
}

const defaultOptions: ITheme = {
  prefix: 'o',
  theme: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e7f8',
    themeLight: '#a9d3f2',
    themeTertiary: '#5ca9e5',
    themeSecondary: '#1a86d9',
    themeDarkAlt: '#006cbe',
    themeDark: '#005ba1',
    themeDarker: '#004377',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#bab8b7',
    neutralSecondary: '#a3a2a0',
    neutralPrimaryAlt: '#8d8b8a',
    neutralPrimary: '#323130',
    neutralDark: '#605e5d',
    black: '#494847',
    white: '#ffffff',
  },
  defaultColors: {
    error: '#A4262C',
  },
  variant: 'none',
}

export function createCSSProperties (theme: { [key: string]: string }) {
  const properties = Object.entries(theme).map(([key, value]) => {
    return `--fabric-${key}:${value};`
  }).join('\n')

  const style = document.getElementById('__fabric__css-properties') ||
    document.createElement('style')
  style.id = '__fabric__css-properties'
  document.head.appendChild(style)
  style.innerHTML = `:root {
    ${properties}
  }`
}

export * from '@/components'

export default function install (Vue: any, options: ITheme = defaultOptions) {
  const _options = Object.assign({}, defaultOptions, options)

  for (const _ in Components) {
    const Component: VueConstructor<Vue> = (Components as any)[_]
    if (!Component.component) continue

    const name: string = `o-${toKebabCase(Component.name)}`
    Vue.component(name, Component)
  }

  const _semanticColors = semanticColors[_options.variant]
  Vue.prototype.$theme = {
    palette: _options.theme,
    semanticColors: _semanticColors,
  }

  createCSSProperties({
    ..._options.defaultColors,
    ..._semanticColors,
    ..._options.theme,
  })
}
