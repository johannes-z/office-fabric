import Vue from 'vue'

// TODO replace with `import { ref } from 'vue'` once composition-api is built into vue@^2.

function reactive (obj) {
  return Vue.observable(obj)
}
const RefKey = 'RefKey'

export function ref<T extends object> (raw: T) {
  const value = reactive({ [RefKey]: raw })

  Object.defineProperty(value, 'value', {
    enumerable: true,
    configurable: true,
    get: () => value[RefKey] as any,
    set: (v) => ((value[RefKey] as any) = v),
  })
  return value
}
