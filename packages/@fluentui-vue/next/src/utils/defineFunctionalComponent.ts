import { type } from 'os'
import { useBoolean } from '@fluentui-vue/vue-hooks'
import type { VNode } from 'vue'
import { ComponentPropsOptions } from 'vue'
import { useBooleanProp } from './useBooleanProp'
import { toCamelCase } from './toCamelCase'
import { toKebabCase } from './toKebabCase'

export const defineFunctionalComponent = (propDefs, renderFn) => {
  renderFn.props = Object.keys(propDefs)

  return (_props, ctx): VNode => {
    const props = Object.entries(propDefs).reduce((obj, [_key, prop]) => {
      const key = toKebabCase(_key)

      switch (prop.type) {
        case Boolean:
          obj[_key] = useBooleanProp(_props[key], prop.default)
          break
        case Number:
          obj[_key] = Number(_props[key]) ?? prop.default
          break
        case String:
          obj[_key] = _props[key] ?? prop.default
          break
        default:
          obj[_key] = _props[key]
      }

      return obj
    }, {})
    return renderFn(props, ctx)
  }
}
