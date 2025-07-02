// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@material/web": path.resolve(__vite_injected_original_dirname, "node_modules/@material/web")
    }
  },
  optimizeDeps: {
    include: [
      "@google/genai",
      "fast-xml-parser",
      "@material/web"
    ],
    exclude: ["lucide-react", "@aws-sdk/client-s3"]
  },
  build: {
    rollupOptions: {
      external: (id) => {
        return id.includes("@aws-sdk") && process.env.NODE_ENV === "production";
      }
    },
    commonjsOptions: {
      include: [/@google\/genai/, /@aws-sdk/, /@material\/web/, /node_modules/]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQG1hdGVyaWFsL3dlYic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdub2RlX21vZHVsZXMvQG1hdGVyaWFsL3dlYicpLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdAZ29vZ2xlL2dlbmFpJywgXG4gICAgICAnZmFzdC14bWwtcGFyc2VyJywgXG4gICAgICAnQG1hdGVyaWFsL3dlYidcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0JywgJ0Bhd3Mtc2RrL2NsaWVudC1zMyddXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IChpZCkgPT4ge1xuICAgICAgICAvLyBEb24ndCBidW5kbGUgQVdTIFNESyBpbiBwcm9kdWN0aW9uIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgcmV0dXJuIGlkLmluY2x1ZGVzKCdAYXdzLXNkaycpICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG4gICAgICB9XG4gICAgfSxcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIGluY2x1ZGU6IFsvQGdvb2dsZVxcL2dlbmFpLywgL0Bhd3Mtc2RrLywgL0BtYXRlcmlhbFxcL3dlYi8sIC9ub2RlX21vZHVsZXMvXVxuICAgIH1cbiAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxpQkFBaUIsS0FBSyxRQUFRLGtDQUFXLDRCQUE0QjtBQUFBLElBQ3ZFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxnQkFBZ0Isb0JBQW9CO0FBQUEsRUFDaEQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPO0FBRWhCLGVBQU8sR0FBRyxTQUFTLFVBQVUsS0FBSyxRQUFRLElBQUksYUFBYTtBQUFBLE1BQzdEO0FBQUEsSUFDRjtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZixTQUFTLENBQUMsa0JBQWtCLFlBQVksa0JBQWtCLGNBQWM7QUFBQSxJQUMxRTtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
