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
    // 提高chunkSizeWarningLimit值避免过大chunk警告
    chunkSizeWarningLimit: 3000,
    // 优化代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue相关依赖
          'vue-vendor': ['vue', 'vue-router'],
          // Ant Design Vue核心
          'antd-core': ['ant-design-vue'],
          // 图标库单独打包
          'antd-icons': ['@ant-design/icons-vue'],
          // API相关代码
          'api-vendor': ['axios'],
          // 国际化相关代码
          'i18n-vendor': ['vue-i18n'],
        },
        // 自动分割代码块
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
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
