import { defineConfig, splitVendorChunkPlugin } from 'vite';
import viteCompression from 'vite-plugin-compression';
import purgecss from 'vite-plugin-purgecss';

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    purgecss({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
      ],
      safelist: [
        /^bg-/, /^text-/, /^fs-/, /^fw-/, /^border/, /^container-/, /^nav-link/,
      ],
    }),
    viteCompression({ algorithm: 'brotliCompress' }),
    viteCompression({ algorithm: 'gzip' }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('/react/')) return 'react';
          }
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
