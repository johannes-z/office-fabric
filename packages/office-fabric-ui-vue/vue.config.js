module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        '@uifabric/styling': '@uifabric-vue/styling',
      },
    },
  },

}
