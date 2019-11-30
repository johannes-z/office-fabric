export function createCSSVars (map: { [key: string]: string }) {
  const mapped: { [key: string]: string } = {}
  for (const key in map) {
    const value = map[key]

    mapped[key] = value
      ? `--${key}: ${value}`
      : ''
  }
  return mapped
}
