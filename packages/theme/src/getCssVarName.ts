const NAMESPACE = 'fluentui'

export function getCssVarName(name: string, defaultColor: string, namespace?: string): string {
  const _name = `${namespace ?? NAMESPACE}-${name}`
  return `var(--${_name}, ${defaultColor})`
}
