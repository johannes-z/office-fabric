module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },

}
