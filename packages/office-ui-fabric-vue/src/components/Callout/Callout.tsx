import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { Layer } from '../Layer/'
import { CalloutContent } from './CalloutContent'
import StatelessComponent from '../StatelessComponent'
import { DirectionalHint } from '../../common/DirectionalHint'

@Component
export class Callout extends StatelessComponent {
  @Prop({ type: HTMLElement, required: true }) target!: any
  @Prop({ type: Boolean, default: false }) doNotLayer!: boolean
  @Prop({ type: Number, default: DirectionalHint.bottomAutoEdge }) directionalHint!: boolean

  render (h: CreateElement, context: any) {
    if (!(context.props.target instanceof Node)) return

    const { layerProps, ...rest } = context.props

    const content = h(CalloutContent, {
      ...context.data,
      props: {
        ...rest,
        ...context.data.attrs,
      },
    }, context.children)

    return context.props.doNotLayer ? content : h(Layer, {
      ...context.data,
      props: {
        ...layerProps,
      },
    }, [content])
  }
}
