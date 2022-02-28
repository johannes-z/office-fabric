import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import path from 'path'

import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const packageRoot = path.resolve(__dirname)

export default {
  input: './lib/index.js',
  external: id => {
    // if (Object.keys(pkg.peerDependencies).indexOf(id) > -1) return true
    // if (Object.keys(pkg.dependencies).indexOf(id) > -1) return true
    if (id === 'vue') return true
    return /core-js|@babel/.test(id)
  },
  output: {
    file: pkg.main,
    name: 'FluentUI',
    format: 'umd',
    globals: {
      vue: 'Vue',
    },
  },
  preserveSymlinks: true,
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(packageRoot, 'src/$1') },
        { find: /@uifabric\/utilities/, replacement: '@uifabric-vue/utilities' },
        { find: /@fluentui\/utilities/, replacement: '@uifabric-vue/utilities' },
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
    esbuild({
      target: 'es6',
      minify: true,
    }),
    vue({
      css: true,
      template: {
        isProduction: true,
      },
    }),
  ],
}
