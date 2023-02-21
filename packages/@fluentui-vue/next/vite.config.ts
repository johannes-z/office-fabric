import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import pkg from './package.json'

export default defineConfig({
  optimizeDeps: {
    entries: 'src/dev.ts',
  },
  plugins: [
    vue(),
    vueJsx(),
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
