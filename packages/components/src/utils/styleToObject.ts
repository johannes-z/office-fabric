export function styleToObject(styles: object | string): Record<string, string> {
  if (!styles || typeof styles !== 'string')
    return {}

  const rules = styles.split(';')
  return rules.reduce((obj, rule) => {
    const [key, value] = rule.split(':')
    obj[key.trim()] = value.trim()
    return obj
  }, {})
}
