import type { IfAny } from '@vue/shared'
import type { ComponentObjectPropsOptions, Prop, PropType } from 'vue'

/**
 * Automatically casts the type of the passed props to the proper `PropType`s as defined in the interface.
 */
function mapPropsToInterface<T, PropsOptions extends ComponentObjectPropsOptions>(props: PropsOptions) {
  return props as unknown as {
    [Property in keyof PropsOptions]: Omit<PropsOptions[Property], 'type'>
  } & {
    [Property in keyof T]: {
      type: PropType<Exclude<T[Property], undefined>>
    }
  }
}

/**
 * Creates props with proper defaults fixing type issues.
 *
 * @author vuetify
 * @see https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/propsFactory.ts
 */
export function propsFactory<
  PropsOptions extends ComponentObjectPropsOptions,
>(props: PropsOptions, source: string) {
  return makeProps(props, source)
}

export function propsFactoryFromInterface<T>() {
  return <PropsOptions extends { [Property in keyof T]-?: Prop<any> }>(props: PropsOptions, source: string) => {
    return makeProps(mapPropsToInterface<T, PropsOptions>(props), source)
  }
}

function makeProps<
  PropsOptions extends ComponentObjectPropsOptions,
>(props: PropsOptions, source: string) {
  return <Defaults extends PartialKeys<PropsOptions>>(
    defaults?: Defaults,
  ): AppendDefault<PropsOptions, Defaults> => {
    return Object.keys(props).reduce<any>((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop])
      const definition = isObjectDefinition ? props[prop] : { type: props[prop] }

      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop],
        }
      }
      else {
        obj[prop] = definition
      }

      if (source && !obj[prop].source)
        obj[prop].source = source

      return obj
    }, {})
  }
}

type AppendDefault<T extends ComponentObjectPropsOptions, D extends PartialKeys<T>> = {
  [P in keyof T]-?: unknown extends D[P]
    ? T[P]
    : T[P] extends Record<string, unknown>
      ? Omit<T[P], 'type' | 'default'> & {
        type: PropType<MergeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
      : {
          type: PropType<MergeDefault<T[P], D[P]>>
          default: MergeDefault<T[P], D[P]>
        }
}

type MergeDefault<T, D> = unknown extends D ? InferPropType<T> : (NonNullable<InferPropType<T>> | D)

/**
 * Like `Partial<T>` but doesn't care what the value is
 */
type PartialKeys<T> = { [P in keyof T]?: unknown }

// Copied from Vue
type InferPropType<T> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
    // As TS issue https://github.com/Microsoft/TypeScript/issues/14829
    // somehow `ObjectConstructor` when inferred from { (): T } becomes `any`
    // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
      ? any
      : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
          ? Record<string, any>
          : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
              ? boolean
              : [T] extends [DateConstructor | { type: DateConstructor }]
                  ? Date
                  : [T] extends [(infer U)[] | { type: (infer U)[] }]
                      ? U extends DateConstructor
                        ? Date | InferPropType<U>
                        : InferPropType<U>
                      : [T] extends [Prop<infer V, infer D>]
                          ? unknown extends V
                            ? IfAny<V, V, D>
                            : V
                          : T
