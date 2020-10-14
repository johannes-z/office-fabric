import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import path from 'path'

import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// @ts-ignore
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

const packageRoot = path.resolve(__dirname)

export default {
  input: './tmp/index.js',
  output: {
    dir: 'lib',
    format: 'esm',
    preserveModules: true,
    sourcemap: false,
  },
  external: id => {
    if ([
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ].indexOf(id) > -1) return true
    return /node_modules|vue-runtime-helpers|@babel\/runtime|core-js/gi.test(id)
  },
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(packageRoot, 'src/$1') },
        { find: '@uifabric/utilities', replacement: '@uifabric-vue/utilities' },
      ],
    }),
    vue({
      css: false,
      template: {
        isProduction: true,
      },
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
      exclude: /node_modules\/(?!vue-runtime-helpers)/gi,
      extensions: ['.js', '.jsx'],
      babelrc: false,
      configFile: false,
      babelHelpers: 'runtime',
      presets: [
        '@vue/babel-preset-jsx',
        '@babel/preset-env',
      ],
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
    }),
  ],
}
