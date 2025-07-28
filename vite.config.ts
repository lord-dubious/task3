import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from all hosts
    // Alternatively, you can use:
    // host: '0.0.0.0'
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
