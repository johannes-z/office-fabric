module.exports = {
  configureWebpack: {
    output: {
      library: 'OfficeUIFabric',
    },
    resolve: {
      symlinks: false,
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },
}
