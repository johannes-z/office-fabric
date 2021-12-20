import Vue, { AsyncComponent, Component, VNode, VNodeChildren, VNodeData } from 'vue'
import { h } from '@vue/composition-api'

type Tag = string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component)

export type Data<T = any> = VNodeData & { attrs?: Partial<T>, children?: any }
type DataOrChildren<T> = Data<T> | VNodeChildren

export interface CreateElement {
  (tag?: Tag, children?: VNodeChildren): VNode;
  <T>(tag?: Tag, data?: Data<T>, children?: VNodeChildren): VNode;
}

function createElement<T> (component?: Tag, dataOrChildren?: DataOrChildren<T>, children?: VNodeChildren) {
  if (!(dataOrChildren instanceof Array) && typeof dataOrChildren === 'object') {
    children = [
      children,
      dataOrChildren?.children,
    ].flat().filter(e => e != null)

    return h(component, dataOrChildren as Data<T>, children)
  }

  if (children) return h(component, dataOrChildren as Data<T>, children)

  return h(component, dataOrChildren as VNodeChildren)
}

export { createElement as h }
