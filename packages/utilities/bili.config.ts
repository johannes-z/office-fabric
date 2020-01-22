import { Config } from 'bili'
import path from 'path'

const projectRoot = path.resolve(__dirname)

const config: Config = {
  input: 'src/index.ts',

  output: {
    dir: './dist',
    format: ['umd-min'],
    moduleName: '@uifabric-vue/utilities',
  },

  env: {
    NODE_ENV: 'production',
  },

  plugins: {
    alias: {
      resolve: ['.ts'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(projectRoot, 'src/$1') },
      ],
    },
    typescript2: {
      tsconfigOverride: {
        compilerOptions: {
          declarationMap: false,
          declaration: false,
        },
      },
    },
  },

}

export default config
