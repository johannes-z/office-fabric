export default {
  functional: true,

  props: {
    vnodes: { type: [Array, Object, Function], required: true },
  },

  render: (h, ctx) => {
    // if vnodes is a function, call it and pass in the children
    if (typeof ctx.props.vnodes === 'function') {
      return ctx.props.vnodes(ctx.children)
    }
    // otherwise render the provided vnodes
    return ctx.props.vnodes
  },
}
