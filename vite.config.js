import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@app':        fileURLToPath(new URL('./src/app', import.meta.url)),
      '@assets':     fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@sections':   fileURLToPath(new URL('./src/sections', import.meta.url)),
      '@features':   fileURLToPath(new URL('./src/features', import.meta.url)),
      '@hooks':      fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@lib':        fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@data':       fileURLToPath(new URL('./src/data', import.meta.url)),
      '@styles':     fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@services':   fileURLToPath(new URL('./src/services', import.meta.url)),
    },
  },

  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase threshold to 1MB for Three.js projects
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('gsap')) return 'vendor-gsap';
            return 'vendor'; // all other dependencies
          }
        },
      },
    },
  },
});
