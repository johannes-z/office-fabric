import 'reflect-metadata'

import Vue from 'vue'
import Preview from './Preview.vue'

Vue.config.productionTip = false

const theme = {
  'themePrimary': '#0078d4',
  'themeLighterAlt': '#f3f9fd',
  'themeLighter': '#d0e7f8',
  'themeLight': '#a9d3f2',
  'themeTertiary': '#5ca9e5',
  'themeSecondary': '#1a86d9',
  'themeDarkAlt': '#006cbe',
  'themeDark': '#005ba1',
  'themeDarker': '#004377',
  'neutralLighterAlt': '#f8f8f8',
  'neutralLighter': '#f4f4f4',
  'neutralLight': '#eaeaea',
  'neutralQuaternaryAlt': '#dadada',
  'neutralQuaternary': '#d0d0d0',
  'neutralTertiaryAlt': '#c8c8c8',
  'neutralTertiary': '#bab8b7',
  'neutralSecondary': '#a3a2a0',
  'neutralPrimaryAlt': '#8d8b8a',
  'neutralPrimary': '#323130',
  'neutralDark': '#605e5d',
  'black': '#494847',
  'white': '#ffffff',
}

const defaultColors = {
  'error': '#A4262C',
}

function createCSSProperties (theme: any) {
  const properties = Object.entries(theme).map(([key, value]) => {
    return `--fabric-${key}: ${value};`
  }).join('\n')

  const style = document.getElementById('__fabric__css-properties') || document.createElement('style')
  style.id = '__fabric__css-properties'
  document.head.appendChild(style)
  console.log(`:root {${properties}}`)
  style.innerHTML = `:root {${properties}}`
}

createCSSProperties({
  ...defaultColors,
  ...theme,
})

new Vue({
  render: h => h(Preview),
}).$mount('#app')

export {
  createCSSProperties,
}
