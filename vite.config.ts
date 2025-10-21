import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.exchangerate.host',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  assetsInclude: ["**/*.woff", "**/*.woff2", "**/*.ttf"],
  build: {
    chunkSizeWarningLimit: 1000, // 根据需要调整阈值
    rollupOptions: {
      // 配置 manualChunks 做自定义分片
    },
  },
})