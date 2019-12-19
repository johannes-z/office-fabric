<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import Layer from '../Layer/Layer.vue'
import CalloutContent from './CalloutContent.vue'

@Component({
  // @ts-ignore
  functional: true,
})
export default class Callout extends Vue {
  @Prop({ type: HTMLElement, required: true }) target!: any
  @Prop({ type: Boolean, default: false }) doNotLayer!: boolean

  render (h: CreateElement, context: any) {
    if (!(context.props.target instanceof Node)) return
    const content = h(CalloutContent, {
      ...context.data,
      props: {
        target: context.props.target,
        ...context.data.attrs,
      },
    }, context.children)

    if (context.props.doNotLayer) {
      return content
    }
    return h(Layer, context.data, [content])
  }
}
</script>

<style lang="scss" scoped>
</style>
