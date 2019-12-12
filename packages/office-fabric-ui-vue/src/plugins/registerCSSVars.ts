import { getDocument } from '@fabric-vue/utilities/'

const hashCode = (s: string) => s.split('')
  .reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0)

const styleMap = new Map()

const STYLE_PREFIX = '__fabric__'

export function registerCSSVars (vars: { [key: string]: string }) {
  const hash = hashCode(JSON.stringify(vars))
  if (styleMap.has(hash)) {

  } else {
    styleMap.set(hash, vars)
    const document = getDocument()
    if (!document) return
    const style = document.createElement('style')
    style.id = `${STYLE_PREFIX}${hash}`
    document.head.appendChild(style)

    style.innerHTML = `
      :root {
        ${Object.values(vars).join(';')}
      }`
  }
}
