import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';
dotenv.config();

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('swiper-'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false, // set to true if your backend uses a valid SSL cert
        // rewrite: path => path.replace(/^\/api/, ''), // uncomment if backend does not expect /api prefix
      },
    },
  },
});
