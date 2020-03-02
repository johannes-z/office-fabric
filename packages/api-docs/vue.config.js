module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/office-fabric/'
    : '/',
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },

}
