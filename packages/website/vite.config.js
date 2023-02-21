import * as path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Markdown from 'vite-plugin-md'

import pkg from './package.json'

export default defineConfig({
  optimizeDeps: {
    entries: 'src/index.ts',
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
    Markdown({
      markdownItOptions: {
        html: false,
        linkify: false,
        typographer: false,
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '@/': path.resolve(__dirname, './src') + '/',
      '@uifabric/utilities': path.resolve(__dirname, './node_modules/@uifabric-vue/utilities/lib/index.js'),
      '@fluentui/utilities': path.resolve(__dirname, './node_modules/@uifabric-vue/utilities/lib/index.js'),
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
      port: '3000',
    },
  },
})
