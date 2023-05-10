import type { DefineComponent, ExtractPropTypes, FunctionalComponent, RendererElement, RendererNode, Slot, VNode } from 'vue'
import { includeBooleanAttr } from './includeBooleanAttr'
import { toKebabCase } from './toKebabCase'

type LooseRequired<T> = { [P in string & keyof T]: T[P] }
type Data = Record<string, unknown>
interface InternalSlots {
  [name: string]: Slot | undefined
}

type MapPropsType<TProps> = Readonly<LooseRequired<Readonly<ExtractPropTypes<TProps>>>>

export interface Context {
  attrs: Data
  slots: Readonly<InternalSlots>
  emit: (event: string, ...args: any[]) => void
}

export interface FunctionalRenderFunction<T> {
  (props: MapPropsType<T>, ctx: Context): VNode<RendererNode, RendererElement, {
    [key: string]: any
  }>

  props?: string[]
  name?: string
}

export interface FunctionalComponentDefinition<TProps extends object> {
  name?: string
  props?: TProps
  render: FunctionalRenderFunction<TProps>
}

export function defineFunctionalComponent<TProps extends object>({ name, props: propDefs = {} as any, render }: FunctionalComponentDefinition<TProps>) {
  const functionalRenderFn = (props: TProps, ctx: Context) => {
    const normalizedProps = Object.entries(propDefs).reduce((obj, [_key, propDef]) => {
      const key = toKebabCase(_key)
      const value = props[key] ?? props[_key]

      switch (propDef.type) {
        case Boolean:
          obj[_key] = includeBooleanAttr(value) // useBooleanProp(value, prop.default)
          break
        case Number:
          obj[_key] = Number(value) ?? propDef.default
          break
        case String:
          obj[_key] = value ?? propDef.default
          break
        default:
          obj[_key] = value
      }

      return obj
    }, {}) as MapPropsType<TProps>
    return render(normalizedProps, ctx)
  }

  functionalRenderFn.props = Object.keys(propDefs)

  Object.defineProperty(functionalRenderFn, 'name', {
    writable: true,
    value: name,
  })

  return functionalRenderFn as {
    (props: Partial<MapPropsType<TProps>>, ctx: Context): VNode<RendererNode, RendererElement, {
      [key: string]: any
    }>
    props: string[]
  }
}
