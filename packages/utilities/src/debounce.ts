export function debounce(func, wait, immediate) {
  let timeout
  return function (this: any, ...args) {
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

export function throttle(f, delay) {
  let timer = 0
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => f.apply(this, args), delay)
  }
}
