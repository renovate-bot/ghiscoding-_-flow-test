import { fileURLToPath, URL } from 'node:url';

import inject from '@rollup/plugin-inject';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    inject({
      // glMatrix: 'gl-matrix',
      // 'global.glMatrix': 'gl-matrix',
      // 'globalThis.glMatrix': 'gl-matrix',
      // 'window.glMatrix': 'gl-matrix',
      // glMatrix: 'glMatrix',
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: resolve('src/auto-import.d.ts'),
    }),
  ],
  define: {
    global: {},
    // global: 'window',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
