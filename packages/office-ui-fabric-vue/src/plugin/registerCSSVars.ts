import { getDocument } from '@uifabric-vue/utilities'

const STYLE_PREFIX = '__fabric__'
const VAR_PREFIX = 'fabric'

export function registerCSSVars (key: string, obj: { [key:string]: string }) {
  const document = getDocument()
  if (!document) return obj

  const id = `${STYLE_PREFIX}${key}`

  let style = document.getElementById(id)
  if (!style) {
    style = document.createElement('style')
    style.id = `${STYLE_PREFIX}${key}`
    document.head.appendChild(style)
  }

  const properties: { [key: string]: string } = {}
  const css: any = []

  for (const key in obj) {
    const value = obj[key]
    properties[key] = `var(--${VAR_PREFIX}-${key})`
    css.push(`--${VAR_PREFIX}-${key}: ${value};`)
  }

  style.innerHTML = `
:root {
  ${css.join('\n  ')}
}`
  return properties
}
