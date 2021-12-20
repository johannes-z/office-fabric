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
  input: './src/index.ts',
  external: id => {
    if (Object.keys(pkg.peerDependencies).indexOf(id) > -1) return true
    if (Object.keys(pkg.dependencies).indexOf(id) > -1) return true
    return /core-js|@babel|@pnp/.test(id)
  },
  output: {
    dir: 'lib',
    format: 'esm',
    preserveModules: true,
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
    }),
    vue({
      css: true,
      template: {
        isProduction: true,
      },
    }),
  ],
}
