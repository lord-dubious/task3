import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@google/genai', 
      'fast-xml-parser', 
      '@material/web/all.js',
      '@material/web/tokens/md-sys-color.css',
      '@material/web/tokens/md-sys-elevation.css',
      '@material/web/tokens/md-sys-motion.css',
      '@material/web/tokens/md-sys-shape.css',
      '@material/web/tokens/md-sys-state.css',
      '@material/web/tokens/md-sys-typescale.css'
    ],
    exclude: ['lucide-react', '@aws-sdk/client-s3']
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Don't bundle AWS SDK in production for better performance
        return id.includes('@aws-sdk') && process.env.NODE_ENV === 'production';
      }
    },
    commonjsOptions: {
      include: [/@google\/genai/, /@aws-sdk/, /node_modules/]
    }
  }
});