import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow connections from any host
    port: 10000, // Custom port
    strictPort: false // Allow fallback to other ports if 10000 is busy
  },
  optimizeDeps: {
    include: ['@google/genai', 'fast-xml-parser'],
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
