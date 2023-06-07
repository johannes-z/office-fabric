/// <reference types="vitest" />
import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
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
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        '@vueuse/core',
        '@fluentui-vue/file-type-icons',
        '@fluentui-vue/hooks',
        '@fluentui-vue/icons',
        '@fluentui-vue/style-utilities',
        '@fluentui-vue/theme',
        '@fluentui-vue/utilities',
        '@fluentui/dom-utilities',
        '@fluentui/merge-styles',
        'tslib',
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
