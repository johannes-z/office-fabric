import { type } from 'os'
import { useBoolean } from '@fluentui-vue/vue-hooks'
import type { VNode } from 'vue'
import { ComponentPropsOptions } from 'vue'
import { useBooleanProp } from './useBooleanProp'

export const defineFunctionalComponent = (propDefs, renderFn) => {
  renderFn.props = Object.keys(propDefs)

  return (_props, ctx): VNode => {
    const props = Object.entries(propDefs).reduce((obj, [key, prop]) => {
      switch (prop.type) {
        case Boolean:
          obj[key] = useBooleanProp(_props[key], prop.default)
          break
        default:
          obj[key] = _props[key]
      }

      return obj
    }, {})
    return renderFn(props, ctx)
  }
}
