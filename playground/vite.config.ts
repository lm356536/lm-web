import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createBaseConfig, createServerConfig } from '@lm/vite-config';

// https://vitejs.dev/config/
export default defineConfig({
  ...createBaseConfig(),
  ...createServerConfig(8081), // 使用8081端口避免与主应用冲突
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
