<script>
/**
 * Helper Component to render Vue-VNodes, e.g. generated from render functions.
 */
export default {
  functional: true,
  render: (h, ctx) => ctx.props.vnodes,
}
</script>
