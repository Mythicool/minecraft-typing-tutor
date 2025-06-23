import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure proper output for Cloudflare Pages
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Optimize for production
    minify: 'terser',
    rollupOptions: {
      output: {
        // Ensure consistent file naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Ensure proper base path
  base: './',
  // Server configuration for development
  server: {
    port: 5173,
    host: true
  },
  // Preview configuration
  preview: {
    port: 4173,
    host: true
  }
})
