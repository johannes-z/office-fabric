export function includeBooleanAttr(value: unknown): boolean {
  return !!value || value === ''
}
