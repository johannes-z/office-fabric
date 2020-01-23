import { Vue, Component } from 'vue-property-decorator'
import { styled } from './styled'

interface IOptions {
  displayName?: string
  styles: any
  [key: string]: any
}

export function createComponent (component: any, options?: IOptions) {
  const decorated = options
    ? Component(options)(component)
    : Component(component)

  decorated.prototype.constructor.options.inject = {
    self: {
      default: {
        ...decorated.prototype.constructor.options.methods,
      },
    },
  }

  if (!options) {
    return styled(
      decorated,
      () => {}
    )
  }

  return styled(
    decorated,
    options.styles,
    undefined,
    options.displayName ? { scope: options.displayName } : undefined,
  )
}
