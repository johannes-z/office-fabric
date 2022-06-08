/// <reference types="vitest" />
import * as path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

import pkg from './package.json'

const toKebabCase = (str: string) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('-')

export default defineConfig({
  optimizeDeps: {
    entries: 'src/dev.ts',
  },
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        // if (name[0] === name[0].toUpperCase()) {
        //   return `${name}`
        // }
        const scope = path.dirname(filename).split(path.sep).pop()
        const className = name === 'root' ? '' : `-${name}`

        if (/^is[A-Z]/.test(name)) {
          return `ms-${scope}--${toKebabCase(name.substring(2))}`
        }

        return `ms-${scope}${className}`
      },
    },
    postcss: {
      plugins: [
        require('postcss-sort-alphabetically'),
      ],
    },
  },
  plugins: [
    createVuePlugin({
      include: [/\.vue$/, /\.md$/],
      jsx: true,
      vueTemplateOptions: {
        compilerOptions: {
          whitespace: 'condense',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '@/': path.resolve(__dirname, './src') + '/',
    },
  },
  define: {
    _APP_VERSION: JSON.stringify(pkg.version),
  },
  server: {
    port: 3000,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@fluentui-vue/components',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
