import { defineConfig } from 'vite'

// Servido pelo site em /tinta-na-alta/: o build vai direito para o public/ do Next.
export default defineConfig({
  base: '/tinta-na-alta/',
  server: { port: 5190 },
  build: { target: 'es2022', outDir: '../public/tinta-na-alta', emptyOutDir: true, chunkSizeWarningLimit: 1200 },
})
