import { KeyCodes } from '@uifabric-vue/utilities'

export function onButtonKeyDown (callback: () => void): (ev: KeyboardEvent) => void {
  return (ev: KeyboardEvent) => {
    switch (ev.which) {
      case KeyCodes.enter:
        callback()
        break
    }
  }
}
