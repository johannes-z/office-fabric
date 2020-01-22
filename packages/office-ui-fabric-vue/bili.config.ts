import { Config } from 'bili'
import path from 'path'

const projectRoot = path.resolve(__dirname)

const config: Config = {
  input: 'src/index.ts',

  output: {
    dir: './lib',
    fileName: `[name][ext]`,
    // moduleName: 'OfficeUIFabric',
    format: ['esm'],
    extractCSS: true,
  },

  env: {
    NODE_ENV: 'production',
  },

  extendRollupConfig: config => {
    config.inputConfig.preserveModules = true
    config.inputConfig.preserveSymlinks = true
    return config
  },

  plugins: {
    babel: {
      exclude: /.*node_modules.*|.*core-js.*/,
      runtimeHelpers: true,
    },
    alias: {
      resolve: ['.jsx', '.js', '.vue', '.ts', '.tsx'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(projectRoot, 'src/$1') },
        { find: '@uifabric/utilities', replacement: './node_modules/@uifabric-vue/utilities' },
      ],
    },
    typescript2: {
      useTsconfigDeclarationDir: true,
    },
    vue: {
      compileTemplate: true,
      css: true,
    },
  },

}

export default config
