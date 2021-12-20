import * as path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

import pkg from './package.json'

export default defineConfig({
  optimizeDeps: {
    entries: 'src/index.ts',
  },
  plugins: [
    createVuePlugin({
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
