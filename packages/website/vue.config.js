console.log('test')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/office-fabric/'
    : '/',
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .options({
        raw: true,
      })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },
}
