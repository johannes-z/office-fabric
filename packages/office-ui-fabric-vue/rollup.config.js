import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

const packageRoot = path.resolve(__dirname)

export default {
  input: './tmp/index.js',
  output: {
    dir: 'lib',
    format: 'es',
    sourcemap: false,
    preserveModules: true,
  },
  external: id => id in pkg.dependencies || id.startsWith('@babel/runtime'),
  preserveSymlinks: true,
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(packageRoot, 'src/$1') },
        { find: /@uifabric\/utilities/, replacement: '@uifabric-vue/utilities' },
      ],
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      preferBuiltins: true,
    }),
    babel({
      exclude: /node_modules/,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelrc: false,
      configFile: false,
      babelHelpers: 'runtime',
      presets: [
        '@vue/babel-preset-jsx'
      ],
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    }),
  ],
}
