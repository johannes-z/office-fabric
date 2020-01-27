const path = require('path')
const alias = require('@rollup/plugin-alias')

const projectRoot = path.resolve(__dirname)

module.exports = {
  configureWebpack: {
    output: {
      library: 'OfficeUIFabric',
      libraryTarget: 'var',
    },
    resolve: {
      symlinks: false,
      alias: {
        '@uifabric/utilities': '@uifabric-vue/utilities',
      },
    },
  },

}
