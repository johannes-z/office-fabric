import { PropType } from 'vue'

type omittedProps = 'componentRef'

export type MappedType<T> = Omit<{
  [K in keyof T]: {
    required?: true,
    default?: T[K] | null | undefined | (() => T[K] | null | undefined),
    validator?(value: T[K]): boolean,
    type: PropType<NonNullable<T[K]>>/* T[K] extends string | undefined
      ? StringConstructor
      : T[K] extends number | undefined
        ? NumberConstructor
        : T[K] extends boolean | undefined
          ? BooleanConstructor
          : T[K] extends Date | undefined
            ? DateConstructor
            : PropType<NonNullable<T[K]>> */
  }
}, omittedProps>

export interface IBaseProps {
  className?: string
}
