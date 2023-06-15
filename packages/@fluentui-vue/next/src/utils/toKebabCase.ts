export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str))
    return toKebabCase.cache.get(str)!
  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
  toKebabCase.cache.set(str, kebab)
  return kebab
}
toKebabCase.cache = new Map<string, string>()
