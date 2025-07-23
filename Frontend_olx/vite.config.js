import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"
import path from "path"; // ✅ this is required when using path.resolve


export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ makes @ point to /src
    },
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@chakra-ui/system',
      '@chakra-ui/toast',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion'
    ],
    exclude: []
  }
})
