import type { VNodeProps } from 'vue'

// replace [key: string] with generic type
export type SlotProps<T = unknown> = { [K in keyof T]?: VNodeProps & Record<string, any> | undefined }
// export type SlotProps<T = unknown> = Record<keyof Partial<T>, VNodeData>

export const asSlotProps = <T>(e: Partial<{ [K in keyof T]: VNodeProps & Record<string, any> }>) => e
