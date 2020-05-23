const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

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

    config.plugin('monaco-editor').use(new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript', 'html'],
    }))
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },
}
