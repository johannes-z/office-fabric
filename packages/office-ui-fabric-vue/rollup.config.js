import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import path from 'path'

import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const packageRoot = path.resolve(__dirname)

export default {
  // external: [
  //   /id/,
  //   'id2',
  // ],
  input: 'src/index.ts',
  output: {
    dir: './lib',
    format: 'esm',
    sourcemap: false,
  },
  external: Object.keys(pkg.dependencies),
  preserveModules: true,
  preserveSymlinks: true,
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      entries: [
        // { find: /^@\/(.*)/, replacement: path.resolve(packageRoot, 'src/$1') },
        // { find: '@uifabric/utilities', replacement: '@uifabric-vue/utilities' },
      ],
    }),
    typescript({
      abortOnError: false,
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
      verbosity: 2,
    }),
    vue(),
    babel({
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
    }),
    resolve({
      rootDir: process.cwd(),
    }),
    commonjs(),
  ],
}
