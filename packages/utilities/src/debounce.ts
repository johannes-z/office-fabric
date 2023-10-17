export function debounce(func, wait, immediate) {
  let timeout: ReturnType<typeof setTimeout> | null
  return function (this: any, ...args) {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      if (!immediate)
        func.apply(this, args)
    }, wait)
    if (immediate && !timeout)
      func.apply(this, [...args])
  }
}

export function throttle(func, delay) {
  let timer: ReturnType<typeof setTimeout> | null
  return function (this: any, ...args) {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => func.apply(this, args), delay)
  }
}
