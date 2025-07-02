import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@material/web': path.resolve(__dirname, 'node_modules/@material/web'),
    },
  },
  optimizeDeps: {
    include: [
      '@google/genai', 
      'fast-xml-parser', 
      '@material/web'
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
      include: [/@google\/genai/, /@aws-sdk/, /@material\/web/, /node_modules/]
    }
  }
});