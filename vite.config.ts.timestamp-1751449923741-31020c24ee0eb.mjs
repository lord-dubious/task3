// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@google/genai",
      "fast-xml-parser"
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
      include: [/@google\/genai/, /@aws-sdk/, /node_modules/]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdAZ29vZ2xlL2dlbmFpJywgXG4gICAgICAnZmFzdC14bWwtcGFyc2VyJ1xuICAgIF0sXG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnLCAnQGF3cy1zZGsvY2xpZW50LXMzJ11cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogKGlkKSA9PiB7XG4gICAgICAgIC8vIERvbid0IGJ1bmRsZSBBV1MgU0RLIGluIHByb2R1Y3Rpb24gZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICByZXR1cm4gaWQuaW5jbHVkZXMoJ0Bhd3Mtc2RrJykgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgaW5jbHVkZTogWy9AZ29vZ2xlXFwvZ2VuYWkvLCAvQGF3cy1zZGsvLCAvbm9kZV9tb2R1bGVzL11cbiAgICB9XG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsZ0JBQWdCLG9CQUFvQjtBQUFBLEVBQ2hEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FBTztBQUVoQixlQUFPLEdBQUcsU0FBUyxVQUFVLEtBQUssUUFBUSxJQUFJLGFBQWE7QUFBQSxNQUM3RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLE1BQ2YsU0FBUyxDQUFDLGtCQUFrQixZQUFZLGNBQWM7QUFBQSxJQUN4RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
