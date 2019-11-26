export function mergeStyleClasses (...args: any[]) {
  const merged: any = {}
  args.forEach(obj => {
    for (const key in obj) {
      if (!(key in merged)) {
        merged[key] = []
      }
      const entry = obj[key]
      if (entry instanceof Array) {
        merged[key].push(...entry)
        continue
      }
      if (typeof entry === 'string') {
        merged[key].push(entry)
        continue
      }
    }
  })
  return merged
}
