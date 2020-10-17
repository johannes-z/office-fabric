import Vue, { AsyncComponent, Component, VNode, VNodeChildren, VNodeData } from 'vue'

type Tag = string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component)

export interface CreateElement {
  <T>(tag?: Tag, children?: VNodeChildren): VNode;
  <T>(tag?: Tag, data?: VNodeData & { attrs?: Partial<T> }, children?: VNodeChildren): VNode;
}

let h: CreateElement
// eslint-disable-next-line no-new
new Vue({
  beforeCreate () {
    h = (component?: Tag, ...args: any) => {
      if (args[0] instanceof Array) return this.$createElement(component, ...args)
      return this.$createElement(component, ...args)
    }
  },
})

export { h }
