import { type PropType, capitalize } from 'vue'

export type EventProp<T extends any[] = any[], F = (...args: T) => any> = F | F[]

export function hasEvent(props: Record<string, any>, name: string) {
  name = `on${capitalize(name)}`
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`])
}
