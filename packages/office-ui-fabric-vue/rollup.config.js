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
  input: './src/index.ts',
  output: {
    dir: path.resolve('lib'),
    // file: 'dist/office-ui-fabric-vue.esm.js',
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
        { find: /^@\/(.*)/, replacement: path.resolve(packageRoot, 'src/$1') },
        { find: '@uifabric/utilities', replacement: '@uifabric-vue/utilities' },
      ],
    }),
    vue({
      css: false,
    }),
    resolve({
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
      preferBuiltins: true,
    }),
    commonjs({ include: /node_modules/ }),
    typescript({
      abortOnError: false,
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
        },
      },
    }),
    babel({
      exclude: /node_modules/,
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
      babelrc: false,
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
  ],
}
