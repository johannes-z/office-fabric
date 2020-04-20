import { Config } from 'bili'
import path from 'path'
import pkg from './package.json'

const projectRoot = path.resolve(__dirname)

process.env.NODE_ENV = 'production'
process.env.BUILD_TYPE = 'module'

const config: Config = {
  input: 'src/index.ts',

  output: {
    dir: './lib',
    fileName: `[name][ext]`,
    moduleName: 'OfficeUIFabric',
    format: 'esm',
    extractCSS: true,
  },

  env: {
    NODE_ENV: 'production',
  },

  extendRollupConfig: config => {
    config.inputConfig.preserveModules = true
    config.inputConfig.preserveSymlinks = true
    config.inputConfig.external = Object.keys(pkg.dependencies)
    return config
  },

  plugins: {
    babel: {
      exclude: /node_modules/,
      extensions: ['.jsx', '.tsx'],
      configFile: false,
      presets: [
        ['@vue/cli-plugin-babel/preset', {
          modules: false,
          useBuiltIns: false,
          jsx: true,
          polyfills: [],
        }],
      ],
    },
    '@rollup/plugin-alias': {
      resolve: ['.jsx', '.js', '.vue', '.ts', '.tsx'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(projectRoot, 'src/$1') },
        { find: '@uifabric/utilities', replacement: path.resolve(projectRoot, 'node_modules/@uifabric-vue/utilities') },
      ],
    },
    typescript2: {
      abortOnError: false,
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
      verbosity: 2,
    },
    vue: true,
  },

}

export default config
