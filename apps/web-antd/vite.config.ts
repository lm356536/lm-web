import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // 增加chunkSizeWarningLimit值来减少警告
    chunkSizeWarningLimit: 1000,
    // 配置manualChunks进行代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // 将ant-design-vue拆分成独立chunk
          'antd-vendor': ['ant-design-vue'],
          // 将vue相关依赖拆分成独立chunk
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // 可以根据项目需要添加更多分割规则
          'common-utils': ['@lm/utils']
        }
      }
    }
  },
  server: {
    port: 3000
  }
});