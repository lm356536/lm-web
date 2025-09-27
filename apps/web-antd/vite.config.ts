import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // 增加chunkSizeWarningLimit值避免过大chunk警告
    chunkSizeWarningLimit: 2000,
    // 按需引入antd后，简化代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 仅保留vue相关依赖的代码分割
          'vue-vendor': ['vue'],
        },
      },
    },
  },
  server: {
    port: 8080,
    strictPort: false, // 端口被占用时自动尝试下一个可用端口
    host: true, // 显示Network地址
    open: true, // 自动打开默认浏览器
  },
});
