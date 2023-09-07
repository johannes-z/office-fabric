export function useBooleanProp(value: boolean | undefined | null | string, defaultValue?: boolean) {
  if (value == null && defaultValue != null)
    return defaultValue
  return value === '' ? true : !!value
}
