import { defineConfig } from 'vite'
import { TITULO, DESCRICAO } from './src/titulo'

// Servido pelo site em /tinta-na-alta/: o build vai direito para o public/ do Next.
export default defineConfig({
  base: '/tinta-na-alta/',
  server: { port: 5190 },
  build: { target: 'es2022', outDir: '../public/tinta-na-alta', emptyOutDir: true, chunkSizeWarningLimit: 1200 },
  plugins: [{
    // O título do conjunto vive em src/titulo.ts; aqui só se copia para o <title> e a descrição.
    name: 'titulo',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%TITULO%', TITULO).replaceAll('%DESCRICAO%', DESCRICAO) },
  }],
})
