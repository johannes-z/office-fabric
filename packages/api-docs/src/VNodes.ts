import { CreateElement, RenderContext } from 'vue'

/**
 * Helper Component to render Vue-VNodes, e.g. generated from render functions.
 */
export default {
  functional: true,
  render: (h: CreateElement, ctx: RenderContext<any>): any => ctx.props.vnodes,
}
