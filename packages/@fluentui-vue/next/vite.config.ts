import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-vue-markdown'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    Markdown(),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
      '@fluentui-vue/components': `${path.resolve(__dirname, './src')}/index`,
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
