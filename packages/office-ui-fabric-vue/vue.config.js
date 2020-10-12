module.exports = {
  configureWebpack: {
    output: {
      library: 'OfficeUIFabric',
    },
    resolve: {
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },
}
