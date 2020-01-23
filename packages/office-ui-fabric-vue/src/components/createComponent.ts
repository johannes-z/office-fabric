import { Vue, Component } from 'vue-property-decorator'
import { styled } from './styled'

interface IOptions {
  displayName: string
  styles: any
  [key: string]: any
}

export function createComponent (component: any, options: IOptions) {
  const decorated = Component(options)(component)

  decorated.prototype.constructor.options.inject = {
    self: {
      default: {
        ...decorated.prototype.constructor.options.methods,
      },
    },
  }

  return styled(
    decorated,
    options.styles,
    undefined,
    { scope: options.displayName }
  )
}
