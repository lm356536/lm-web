import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createBaseConfig, createServerConfig } from '@lm/vite-config';

// https://vitejs.dev/config/
export default defineConfig({
  ...createBaseConfig(),
  ...createServerConfig(3000), // 主应用使用3000端口
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});