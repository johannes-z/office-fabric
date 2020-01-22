const path = require('path')
const alias = require('@rollup/plugin-alias')

const projectRoot = path.resolve(__dirname)

module.exports = {
  pluginOptions: {
    p11n: {
      configureRollup: {
        plugins: [

          alias({
            resolve: ['.jsx', '.js', '.vue', '.ts', '.tsx'],
            entries: [
              { find: /^@\/(.*)/, replacement: path.resolve(projectRoot, 'src/$1') },
              { find: '@uifabric/utilities', replacement: './node_modules/@uifabric-vue/utilities' },
            ],
          }),
        ],
        external: ['lodash'],
      },
    },
  },
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
