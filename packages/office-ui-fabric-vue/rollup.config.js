import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
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
    terser(),
    // babel({
    //   exclude: /node_modules\/(?!vue-runtime-helpers)/gi,
    //   extensions: ['.js', '.jsx'],
    //   babelrc: false,
    //   configFile: false,
    //   babelHelpers: 'runtime',
    //   presets: [
    //     '@vue/babel-preset-jsx',
    //     ['@babel/preset-env', {
    //       loose: true,
    //       bugfixes: true,
    //     }],
    //   ],
    //   plugins: [
    //     '@babel/plugin-transform-runtime',
    //   ],
    // }),
  ],
}
