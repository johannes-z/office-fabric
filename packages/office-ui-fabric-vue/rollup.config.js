import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const packageRoot = path.resolve(__dirname)

export default {
  input: './lib/index.js',
  output: {
    file: 'dist/fluent-ui.umd.min.js',
    format: 'umd',
    name: 'FluentUIVue',
    exports: 'named',
    sourcemap: false,
    globals: {
      vue: 'Vue',
    },
  },
  external: ['vue'],
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
    commonjs({
      include: /node_modules/,
      sourceMap: false,
    }),
    babel({
      exclude: /node_modules/gi,
      extensions: ['.js', '.jsx'],
      babelrc: false,
      configFile: false,
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          loose: true,
          bugfixes: true,
          targets: {
            browsers: 'IE 11'
          }
        }],
      ],
    }),
    terser(),
  ],
}
