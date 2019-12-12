import Vue, { VueConstructor } from 'vue'
import * as Components from '@/components/'
import { semanticColors } from '@/util'
import { IPalette, DefaultPalette, DefaultFontStyles, DefaultEffects } from '@fabric-vue/styling'

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
    themeDarker: '#004578',
    themeDark: '#005a9e',
    themeDarkAlt: '#106ebe',
    themePrimary: '#0078d4',
    themeSecondary: '#2b88d8',
    themeTertiary: '#71afe5',
    themeLight: '#c7e0f4',
    themeLighter: '#deecf9',
    themeLighterAlt: '#eff6fc',
    black: '#000000',
    blackTranslucent40: 'rgba(0,0,0,.4)',
    neutralDark: '#201f1e',
    neutralPrimary: '#323130',
    neutralPrimaryAlt: '#3b3a39',
    neutralSecondary: '#605e5c',
    neutralSecondaryAlt: '#8a8886',
    neutralTertiary: '#a19f9d',
    neutralTertiaryAlt: '#c8c6c4',
    neutralQuaternary: '#d2d0ce',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralLight: '#edebe9',
    neutralLighter: '#f3f2f1',
    neutralLighterAlt: '#faf9f8',
    accent: '#0078d4',
    white: '#ffffff',
    whiteTranslucent40: 'rgba(255,255,255,.4)',
    yellowDark: '#d29200',
    yellow: '#ffb900',
    yellowLight: '#fff100',
    orange: '#d83b01',
    orangeLight: '#ea4300',
    orangeLighter: '#ff8c00',
    redDark: '#a4262c',
    red: '#e81123',
    magentaDark: '#5c005c',
    magenta: '#b4009e',
    magentaLight: '#e3008c',
    purpleDark: '#32145a',
    purple: '#5c2d91',
    purpleLight: '#b4a0ff',
    blueDark: '#002050',
    blueMid: '#00188f',
    blue: '#0078d4',
    blueLight: '#00bcf2',
    tealDark: '#004b50',
    teal: '#008272',
    tealLight: '#00b294',
    greenDark: '#004b1c',
    green: '#107c10',
    greenLight: '#bad80a',
  },
  defaultColors: {
    error: '#A4262C',
  },
  variant: 'none',
}

export function createCSSProperties (theme: { [key: string]: string }) {
  const properties: any = {}
  const css: any = []
  for (const key in theme) {
    const value = theme[key]
    properties[key] = `var(--fabric-${key})`
    css.push(`--fabric-${key}: ${value};`)
  }

  let style = document.getElementById('__fabric__css-properties')
  if (!style) {
    style = document.createElement('style')
    style.id = '__fabric__css-properties'
    document.head.appendChild(style)
  }
  style.innerHTML = `
  ${style.innerHTML}
  :root {
    ${css.join('\n')}
  }`
  return properties
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

  const _palette = createCSSProperties(_options.theme as any)
  const _semanticColors = createCSSProperties(semanticColors[_options.variant])
  Vue.prototype.$theme = {
    effects: DefaultEffects,
    fonts: DefaultFontStyles,
    palette: _palette,
    semanticColors: {
      ..._semanticColors,
      errorText: '#A4262C',
    },
  }

  createCSSProperties(_options.defaultColors)
}

/*

============================
    CSS Vars
--neutralLight: #eaeaea;
--bodyFrameBackground: var(--neutralLight)

{
  neutralLight: 'var(--neutralLight)'
}
{
  bodyFrameBackground: 'var(--neutralLight)'
}

======================================
    No CSS Vars
{
  neutralLight: '#eaeaea'
}
{
  bodyFrameBackground: '#eaeaea'
}

 */
