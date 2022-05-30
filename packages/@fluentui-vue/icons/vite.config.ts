import * as path from 'path'
import { defineConfig } from 'vite'

import pkg from './package.json'

export default defineConfig({
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
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@fluentui-vue/icon',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fluentui/merge-styles',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
